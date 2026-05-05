# Terraform ECR Deployment anwenden

Voraussetzung: Wie immer, Credentials in der Pipeline/Terminal updaten und ein S3 bucket anlegen für den TF state

1. Erstellt manuell ein test repository über den ECR service in der AWS Console
2. Kopiert euch die Datei [../terraform/ecr.tf](../terraform/ecr.tf) in euer projekt und startet die Pipeline (entweder lokal oder noch besser mit einem commit automatisiert auf den main branch)
3. Vergleicht das UI basierte deployment mit der Terraform Datei und versucht herauszufinden, wo ihr welche Komponenten wiederfindet

# Build und Push auf ECR umsetzen

1. Fügt folgende Schritte zu eurer Pipelin hinzu und vergleicht die Schritte mit der [../.github/workflows/old-docker-publish.yml](../.github/workflows/old-docker-publish.yml) Datei und versucht die Parallelen nachzuvollziehen

```bash

      - name: Read ECR repository name from Terraform output
        id: tf-output
        working-directory: terraform
        run: echo "ecr_repository=$(terraform output -raw ecr_repository_name)" >> "$GITHUB_OUTPUT"

      - name: Login to Amazon ECR
        id: ecr-login
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build, tag, and push Docker image
        env:
          ECR_REGISTRY: ${{ steps.ecr-login.outputs.registry }}
          ECR_REPOSITORY: ${{ steps.tf-output.outputs.ecr_repository }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG -t $ECR_REGISTRY/$ECR_REPOSITORY:latest .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest
```
