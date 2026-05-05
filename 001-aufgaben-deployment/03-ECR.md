# Terraform ECR Deployment anwenden

Voraussetzung: Wie immer, Credentials in der Pipeline/Terminal updaten und ein S3 bucket anlegen für den TF state

1. Erstellt manuell ein test repository über den ECR service in der AWS Console
2. Kopiert euch die Datei [../terraform/ecr.tf](../terraform/ecr.tf) in euer projekt und startet die Pipeline (entweder lokal oder noch besser mit einem commit automatisiert auf den main branch)
3. Vergleicht das UI basierte deployment mit der Terraform Datei und versucht herauszufinden, wo ihr welche Komponenten wiederfindet
