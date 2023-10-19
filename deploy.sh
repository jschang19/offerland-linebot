echo "Deploying to gcloud..."

gcloud functions deploy offerland-line-oa \
--gen2 \
--runtime=nodejs18 \
--region=asia-east1 \
--source=. \
--max-instances=3 \
--entry-point=main \
--trigger-http \
--allow-unauthenticated \
--env-vars-file=.env.yaml

echo "Deployed to gcloud!"