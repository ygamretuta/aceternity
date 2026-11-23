variable "project_name" {
  type    = string
  default = "aceternity"
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "github_repo" {
  description = "GitHub repository in owner/name form"
  type        = string
}

variable "domain" {
  description = "Production domain, empty to skip"
  type        = string
  default     = ""
}

variable "database_url" {
  type      = string
  sensitive = true
}

variable "direct_url" {
  type      = string
  sensitive = true
}

variable "sentry_dsn" {
  type = string
}

variable "sentry_auth_token" {
  type      = string
  sensitive = true
}

variable "posthog_key" {
  type = string
}

variable "posthog_host" {
  type    = string
  default = "https://us.i.posthog.com"
}

variable "s3_access_key_id" {
  type      = string
  sensitive = true
}

variable "s3_secret_access_key" {
  type      = string
  sensitive = true
}

variable "github_token" {
  type      = string
  sensitive = true
}

variable "site_url" {
  type    = string
  default = ""
}
