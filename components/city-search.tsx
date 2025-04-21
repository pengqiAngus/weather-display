import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useCitySearch } from "@/hooks/use-city-search"
import { useDebounce } from "@/hooks/use-debounce"
import { City } from "@/types/city"

interface CitySearchProps {
  onSelectCity: (city: City) => void
}

export function CitySearch({ onSelectCity }: CitySearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const { data: searchResults } = useCitySearch(debouncedSearchQuery)

  return (
    <div className="relative max-w-md mx-auto mb-6">
      <div className="flex">
        <Input
          type="text"
          placeholder="搜索城市..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white/20 backdrop-blur-sm border-none text-white placeholder:text-white/70 pr-10"
        />
        <Button variant="ghost" className="absolute right-0 top-0 h-full aspect-square">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {searchQuery && searchResults?.districts && searchResults.districts.length > 0 && (
        <Card className="absolute w-full mt-1 z-10 bg-white/90 backdrop-blur-sm text-gray-800">
          <CardContent className="p-2">
            {searchResults.districts.map((city: City) => (
              <Button
                key={city.adcode}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onSelectCity(city)
                  setSearchQuery("")
                }}
              >
                {city.name}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 