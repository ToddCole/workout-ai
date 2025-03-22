# AI Workout Generator

A Next.js application that generates personalized workout plans using AI. Built with TypeScript, Tailwind CSS, and OpenAI's API.

## Features

- Personalized workout generation based on:
  - Fitness level
  - Workout type
  - Duration
  - Available equipment
  - Muscle focus
- Beautiful, responsive UI
- Dark mode support
- Fallback to mock data if API fails

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI API
- Vercel (deployment)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is optimized for deployment on Vercel. To deploy:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
