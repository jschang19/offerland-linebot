# OfferLand LINE Bot

This is a LINE Bot project that aiming to reach users of OfferLand. It's an alternative to develop mobile app for extra notification features.

## Getting Started

Clone the project

```bash
  git clone https://github.com/jschang19/offerland-linebot.git
```

Go to the project directory

```bash
  cd offerland-linebot
```

Install dependencies

```bash
  yarn install
```

Start the server, the server will run on `localhost:8080`

```bash
  yarn start
```

## Tech Stack

**Language:** Typescript

**Framework:** Node.js 18

**Runtime:** Google Cloud Functions v2

## API Reference

### LINE Webhook

#### POST `/line`

Set `{your_domain_of_the_function}/line` as the Webhook URL in your LINE developer project dashboard.

For more details, follow [LINE Official Messaging API Doc ](https://developers.line.biz/en/reference/messaging-api/#webhooks) to call the API.

### Supabase Cronjob trigger

#### POST`/supabase/{task}/{multicast_type}`

| Parameter | Type    | Description                                  |
| :-------- | :------ | :------------------------------------------- |
| `results` | `Array` | **Required**. Lists of new uploaded results. |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
LINE_CHANNEL_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=
SUPABASE_SERVICE_KEY=
SUPABASE_URL=
```
