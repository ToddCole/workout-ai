'use client';

import { useState } from 'react';
import { WorkoutPreferences, Exercise, Equipment } from '@/types/workout';

export default function Home() {
  const [preferences, setPreferences] = useState<WorkoutPreferences>({
    fitnessLevel: 'beginner',
    workoutType: 'strength',
    duration: 30,
    equipment: 'Bodyweight only',
    muscleFocus: '',
  });
  const [workout, setWorkout] = useState<Exercise[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate workout');
      }

      if (!data.exercises || !Array.isArray(data.exercises)) {
        throw new Error('Invalid workout data received');
      }

      setWorkout(data.exercises);
    } catch (error) {
      console.error('Error generating workout:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate workout');
      
      // Fallback to mock data
      const mockWorkout: Exercise[] = [
        {
          name: 'Push-ups',
          sets: 3,
          reps: '10-12',
          rest: '60 seconds',
          notes: 'Keep your back straight and elbows close to your body',
        },
        {
          name: 'Squats',
          sets: 3,
          reps: '12-15',
          rest: '60 seconds',
          notes: 'Keep your knees aligned with your toes',
        },
        {
          name: 'Plank',
          sets: 3,
          reps: '30-45 seconds',
          rest: '45 seconds',
          notes: 'Maintain a straight line from head to heels',
        },
      ];
      setWorkout(mockWorkout);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Workout Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get a personalized workout plan tailored to your goals
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Fitness Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fitness Level
              </label>
              <select
                value={preferences.fitnessLevel}
                onChange={(e) => setPreferences({ ...preferences, fitnessLevel: e.target.value as WorkoutPreferences['fitnessLevel'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Workout Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workout Type
              </label>
              <select
                value={preferences.workoutType}
                onChange={(e) => setPreferences({ ...preferences, workoutType: e.target.value as WorkoutPreferences['workoutType'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              >
                <option value="strength">Strength Training</option>
                <option value="cardio">Cardio</option>
                <option value="hiit">HIIT</option>
                <option value="flexibility">Flexibility</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={preferences.duration}
                onChange={(e) => setPreferences({ ...preferences, duration: parseInt(e.target.value) })}
                min="10"
                max="120"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              />
            </div>

            {/* Equipment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Equipment
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Bodyweight only', 'Home gym', 'Full gym'].map((item) => (
                  <label key={item} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={preferences.equipment === item}
                      onChange={(e) => setPreferences({ ...preferences, equipment: item as Equipment })}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Muscle Focus */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Muscle Focus (Optional)
              </label>
              <input
                type="text"
                value={preferences.muscleFocus}
                onChange={(e) => setPreferences({ ...preferences, muscleFocus: e.target.value })}
                placeholder="e.g., chest, legs, back"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? "Generating..." : "Generate Workout"}
            </button>
          </form>
        </div>

        {workout.length > 0 && (
          <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Your Workout</h2>
            <div className="space-y-4">
              {workout.map((exercise, index) => (
                <div 
                  key={index} 
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exercise.name}</h3>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3">
                      <p className="text-sm text-indigo-600 dark:text-indigo-400">Sets</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{exercise.sets}</p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3">
                      <p className="text-sm text-indigo-600 dark:text-indigo-400">Reps</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{exercise.reps}</p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3">
                      <p className="text-sm text-indigo-600 dark:text-indigo-400">Rest</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{exercise.rest}</p>
                    </div>
                  </div>
                  {exercise.notes && (
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 italic">
                      {exercise.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
