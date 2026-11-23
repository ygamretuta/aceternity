terraform {
  required_version = ">= 1.9"
  required_providers {
    vercel = { source = "vercel/vercel", version = "~> 3.0" }
    aws    = { source = "hashicorp/aws", version = "~> 6.0" }
  }
}

provider "aws" {
  region = var.aws_region
}
