'use client';

import { useState } from 'react';
import { WorkoutPreferences, Exercise, Equipment } from '@/types/workout';
import { 
  Dumbbell, 
  Timer, 
  Activity, 
  ChevronDown, 
  ChevronUp,
  DumbbellIcon,
  TimerIcon,
  ActivityIcon,
  Target,
  Info
} from 'lucide-react';

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [workout, setWorkout] = useState<Exercise[]>([]);
  const [preferences, setPreferences] = useState<WorkoutPreferences>({
    fitnessLevel: 'beginner',
    workoutType: 'strength',
    duration: 30,
    equipment: 'Bodyweight only',
    muscleFocus: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error('Failed to generate workout');
      }

      const data = await response.json();
      if (!Array.isArray(data.exercises)) {
        throw new Error('Invalid response format');
      }

      setWorkout(data.exercises);
    } catch (err) {
      console.error('Error generating workout:', err);
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
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            AI Workout Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get a personalized workout plan tailored to your goals and fitness level
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-gray-100 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Fitness Level */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Fitness Level
              </label>
              <select
                value={preferences.fitnessLevel}
                onChange={(e) => setPreferences({ ...preferences, fitnessLevel: e.target.value as WorkoutPreferences['fitnessLevel'] })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Workout Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Workout Type
              </label>
              <select
                value={preferences.workoutType}
                onChange={(e) => setPreferences({ ...preferences, workoutType: e.target.value as WorkoutPreferences['workoutType'] })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="strength">Strength Training</option>
                <option value="cardio">Cardio</option>
                <option value="hiit">HIIT</option>
                <option value="flexibility">Flexibility</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={preferences.duration}
                onChange={(e) => setPreferences({ ...preferences, duration: parseInt(e.target.value) })}
                min="10"
                max="120"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base bg-white dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Equipment */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Available Equipment
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['Bodyweight only', 'Home gym', 'Full gym'].map((item) => (
                  <label key={item} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={preferences.equipment === item}
                      onChange={() => setPreferences({ ...preferences, equipment: item as Equipment })}
                      className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Muscle Focus */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Muscle Focus (Optional)
              </label>
              <input
                type="text"
                value={preferences.muscleFocus}
                onChange={(e) => setPreferences({ ...preferences, muscleFocus: e.target.value })}
                placeholder="e.g., chest, legs, back"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base bg-white dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-base shadow-lg hover:shadow-xl"
            >
              {isGenerating ? "Generating..." : "Generate Workout"}
            </button>
          </form>
        </div>

        {workout.length > 0 && (
          <div className="mt-12 space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Workout</h2>
              <p className="text-gray-600 dark:text-gray-300">Click on any exercise to see more details</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {workout.map((exercise, index) => {
                const [isExpanded, setIsExpanded] = useState(false);
                return (
                  <div 
                    key={index} 
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden"
                  >
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                          <Dumbbell className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white text-left">{exercise.name}</h3>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="px-6 pb-6">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-1">
                              <ActivityIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Sets</p>
                            </div>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{exercise.sets}</p>
                          </div>
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-1">
                              <DumbbellIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Reps</p>
                            </div>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{exercise.reps}</p>
                          </div>
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-1">
                              <TimerIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Rest</p>
                            </div>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{exercise.rest}</p>
                          </div>
                        </div>
                        {exercise.notes && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                              <p className="text-sm text-blue-700 dark:text-blue-300">{exercise.notes}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
