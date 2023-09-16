echo "Deploying to gcloud..."

gcloud functions deploy offerland_linebot \
--gen2 \
--runtime=nodejs18 \
--region=asia-east1 \
--source=. \
--max-instances=3 \
--entry-point=main \
--trigger-http \
--allow-unauthenticated 

echo "Deployed to gcloud!"