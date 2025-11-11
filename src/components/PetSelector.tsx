import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dog, Cat } from 'lucide-react'

interface PetSelectorProps {
  onSelect?: (petType: string, age: string, breed: string) => void
}

export const PetSelector = ({ onSelect }: PetSelectorProps) => {
  const [selectedPet, setSelectedPet] = useState<'dog' | 'cat' | null>(null)
  const [selectedAge, setSelectedAge] = useState<string>('')
  const [selectedBreed, setSelectedBreed] = useState<string>('')

  const dogAges = ['Puppy (0-1y)', 'Adult (1-7y)', 'Senior (7+y)']
  const catAges = ['Kitten (0-1y)', 'Adult (1-10y)', 'Senior (10+y)']
  
  const dogBreeds = ['Small Breed', 'Medium Breed', 'Large Breed', 'Giant Breed']
  const catBreeds = ['Shorthair', 'Longhair', 'Mixed Breed']

  const ages = selectedPet === 'dog' ? dogAges : catAges
  const breeds = selectedPet === 'dog' ? dogBreeds : catBreeds

  const handleSubmit = () => {
    if (selectedPet && selectedAge && selectedBreed) {
      onSelect?.(selectedPet, selectedAge, selectedBreed)
    }
  }

  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
      <h3 className="text-2xl font-light text-foreground mb-6 text-center">
        Find Perfect Nutrition
      </h3>
      
      <div className="space-y-6">
        {/* Pet Type Selection */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-3 block">
            Pet Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setSelectedPet('dog')
                setSelectedAge('')
                setSelectedBreed('')
              }}
              className={`p-6 rounded border-2 transition-all ${
                selectedPet === 'dog'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Dog className="h-8 w-8 mx-auto mb-2 text-foreground" />
              <span className="text-sm font-medium text-foreground">Dog</span>
            </button>
            <button
              onClick={() => {
                setSelectedPet('cat')
                setSelectedAge('')
                setSelectedBreed('')
              }}
              className={`p-6 rounded border-2 transition-all ${
                selectedPet === 'cat'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Cat className="h-8 w-8 mx-auto mb-2 text-foreground" />
              <span className="text-sm font-medium text-foreground">Cat</span>
            </button>
          </div>
        </div>

        {/* Age Selection */}
        {selectedPet && (
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-3 block">
              Age
            </label>
            <div className="grid grid-cols-3 gap-3">
              {ages.map((age) => (
                <button
                  key={age}
                  onClick={() => setSelectedAge(age)}
                  className={`p-3 rounded border transition-all text-sm ${
                    selectedAge === age
                      ? 'border-primary bg-primary/5 font-medium'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Breed Selection */}
        {selectedPet && selectedAge && (
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-3 block">
              Breed Size
            </label>
            <div className="grid grid-cols-2 gap-3">
              {breeds.map((breed) => (
                <button
                  key={breed}
                  onClick={() => setSelectedBreed(breed)}
                  className={`p-3 rounded border transition-all text-sm ${
                    selectedBreed === breed
                      ? 'border-primary bg-primary/5 font-medium'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {breed}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        {selectedPet && selectedAge && selectedBreed && (
          <Button
            onClick={handleSubmit}
            className="w-full mt-4"
            size="lg"
          >
            Find Products
          </Button>
        )}
      </div>
    </Card>
  )
}
