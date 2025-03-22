export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type WorkoutType = 'strength' | 'cardio' | 'flexibility' | 'hiit';
export type Equipment = 'Bodyweight only' | 'Home gym' | 'Full gym';
export type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Full Body';

export interface WorkoutPreferences {
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  workoutType: 'strength' | 'cardio' | 'hiit' | 'flexibility';
  duration: number;
  equipment: Equipment;
  muscleFocus?: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
  imageUrl?: string;
  videoUrl?: string;
} 