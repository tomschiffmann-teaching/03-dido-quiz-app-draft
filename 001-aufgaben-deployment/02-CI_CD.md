# Aufgabe 2: VPC IaC Deployment automatisieren mit CI/CD

1. GitHub Actions Workflow bauen, der unser `terraform apply --auto-approve` automatisiert auf einen `push` Befegl auf den `main`-Branch auslöst
2. GitHub Actions Workflow bauen, der eine manuelle Aktion für ein `terraform destroy` ermöglicht

- denkt an die credentials (secret_access_key) und diese in Github richtig zu hinterlegen
- denkt an ein s3 bucket für den terraform state
