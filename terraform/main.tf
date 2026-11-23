resource "aws_s3_bucket" "uploads" {
  bucket = "${var.project_name}-uploads"
}

resource "aws_s3_bucket_public_access_block" "uploads" {
  bucket                  = aws_s3_bucket.uploads.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "vercel_project" "app" {
  name      = var.project_name
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = var.github_repo
  }
}

locals {
  env = {
    DATABASE_URL              = { value = var.database_url, sensitive = true }
    GITHUB_TOKEN              = { value = var.github_token, sensitive = true }
    NEXT_PUBLIC_SITE_URL      = { value = var.site_url, sensitive = false }
    DIRECT_URL                = { value = var.direct_url, sensitive = true }
    S3_BUCKET                 = { value = aws_s3_bucket.uploads.bucket, sensitive = false }
    S3_REGION                 = { value = var.aws_region, sensitive = false }
    S3_ACCESS_KEY_ID          = { value = var.s3_access_key_id, sensitive = true }
    S3_SECRET_ACCESS_KEY      = { value = var.s3_secret_access_key, sensitive = true }
    SENTRY_DSN                = { value = var.sentry_dsn, sensitive = false }
    NEXT_PUBLIC_SENTRY_DSN    = { value = var.sentry_dsn, sensitive = false }
    SENTRY_AUTH_TOKEN         = { value = var.sentry_auth_token, sensitive = true }
    NEXT_PUBLIC_POSTHOG_KEY   = { value = var.posthog_key, sensitive = false }
    NEXT_PUBLIC_POSTHOG_HOST  = { value = var.posthog_host, sensitive = false }
  }
}

resource "vercel_project_environment_variable" "app" {
  for_each   = local.env
  project_id = vercel_project.app.id
  key        = each.key
  value      = each.value.value
  sensitive  = each.value.sensitive
  target     = ["production", "preview"]
}

resource "vercel_project_domain" "production" {
  count      = var.domain == "" ? 0 : 1
  project_id = vercel_project.app.id
  domain     = var.domain
}
