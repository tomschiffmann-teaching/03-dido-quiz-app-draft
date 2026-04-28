# VPC deployen

Dafür benötigt ihr die aktuellen Terraform Dateien aus dem Ordner [../terraform/](../terraform/):

- [main.tf](../terraform/main.tf)
- [variables.tf](../terraform/variables.tf)
- [vpc.tf](../terraform/vpc.tf)

1. Ruft den VPC service in der AWS Console auf und klickt auf VPC ersten (VPC und mehr) und vergleciht die Terraform Dateien mit dem, was ihr in der UI seht.
2. Wendet die Terraform deployments mit eurer eigenen Sandbox an
   Tips:

- denkt an die credentials (secret_access_key)
- denkt an ein s3 bucket für den terraform state
