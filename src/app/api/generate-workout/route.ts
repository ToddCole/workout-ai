import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { WorkoutPreferences } from '@/types/workout';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const preferences: WorkoutPreferences = await request.json();

    const prompt = `Generate a personalized workout plan with the following preferences:
    - Fitness Level: ${preferences.fitnessLevel}
    - Workout Type: ${preferences.workoutType}
    - Duration: ${preferences.duration} minutes
    - Available Equipment: ${preferences.equipment}
    ${preferences.muscleFocus ? `- Muscle Focus: ${preferences.muscleFocus}` : ''}

    Please provide a JSON response with an array of exercises, where each exercise has:
    - name: string
    - sets: number
    - reps: string
    - rest: string
    - notes: string (optional)

    The workout should be appropriate for the specified fitness level and duration.
    Include a mix of exercises that target different muscle groups.
    Provide form notes for each exercise to ensure proper execution.

    Return the response in this exact format:
    {
      "exercises": [
        {
          "name": "Exercise Name",
          "sets": 3,
          "reps": "10-12",
          "rest": "60 seconds",
          "notes": "Form notes here"
        }
      ]
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional fitness trainer and workout planner. Generate safe and effective workout plans based on user preferences. Always return the response in valid JSON format with an 'exercises' array."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');

    if (!response.exercises || !Array.isArray(response.exercises)) {
      throw new Error('Invalid response format from OpenAI');
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error generating workout:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate workout' },
      { status: 500 }
    );
  }
} 