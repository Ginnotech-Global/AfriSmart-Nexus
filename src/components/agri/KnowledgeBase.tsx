import { useState } from "react";
import { BookOpen, Search, ChevronRight, Star, Eye, Download, Globe, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Article {
  id: string;
  title: string;
  category: string;
  language: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: number;
  views: number;
  rating: number;
  tags: string[];
  downloadable: boolean;
}

const categories = [
  "Crop Management", "Pest Control", "Soil Health", "Irrigation", "Fertilization",
  "Post-Harvest", "Marketing", "Weather", "Equipment", "Organic Farming"
];

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ha", name: "Hausa", flag: "🇳🇬" },
  { code: "yo", name: "Yoruba", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", flag: "🇳🇬" },
  { code: "pcm", name: "Pidgin", flag: "🇳🇬" }
];

export const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [activeTab, setActiveTab] = useState("browse");

  // Mock articles data
  const articles: Article[] = [
    {
      id: "1",
      title: "Complete Guide to Maize Pest Management",
      category: "Pest Control",
      language: "en",
      content: `This comprehensive guide covers identification and management of major maize pests in Nigeria.

## Common Maize Pests

### Fall Armyworm (Spodoptera frugiperda)
- **Identification**: Look for irregular holes in leaves and frass (insect droppings)
- **Damage**: Can cause 20-50% yield loss if not controlled
- **Control Methods**:
  - Cultural: Early planting, crop rotation
  - Biological: Release of natural enemies like Cotesia icipe
  - Chemical: Use approved insecticides when threshold is reached

### Stem Borers
- **Types**: African maize stem borer, Pink stem borer
- **Damage**: Tunnel into stems causing lodging and dead hearts
- **Management**: 
  - Plant resistant varieties
  - Remove and destroy crop residues
  - Use pheromone traps for monitoring

## Integrated Pest Management (IPM)
1. **Prevention**: Proper field sanitation, certified seeds
2. **Monitoring**: Regular field scouting, economic threshold levels
3. **Control**: Combine cultural, biological, and chemical methods
4. **Evaluation**: Assess effectiveness and adjust strategies

## Best Practices
- Scout fields weekly during growing season
- Apply treatments based on economic thresholds
- Rotate pesticides to prevent resistance
- Keep detailed records of pest incidents and treatments`,
      author: "Dr. Adamu Mohammed",
      publishDate: "2024-01-15",
      readTime: 12,
      views: 2450,
      rating: 4.8,
      tags: ["maize", "pest control", "fall armyworm", "stem borer", "IPM"],
      downloadable: true
    },
    {
      id: "2",
      title: "Soil Testing and Fertilizer Recommendations",
      category: "Soil Health",
      language: "en",
      content: `Understanding your soil is crucial for successful farming. This guide explains soil testing procedures and fertilizer recommendations.

## Why Test Your Soil?
- Determine nutrient levels
- Check soil pH
- Identify deficiencies
- Optimize fertilizer use
- Improve crop yields

## Soil Sampling Procedure
1. **When to Sample**: Before planting season, when soil is not too wet
2. **How Much**: Collect from 10-15 random spots per field
3. **Depth**: 0-20cm for most crops
4. **Tools**: Soil auger, clean bucket, sample bags

## Understanding Soil Test Results
- **pH**: Optimal range 6.0-7.0 for most crops
- **Organic Matter**: Should be >3% for good fertility
- **Nitrogen (N)**: Mobile nutrient, test annually
- **Phosphorus (P)**: Less mobile, affects root development
- **Potassium (K)**: Important for disease resistance

## Fertilizer Recommendations by Crop
### Maize
- **Base**: 200kg NPK 15:15:15 per hectare
- **Top dress**: 100kg Urea at 4-6 weeks after planting

### Rice
- **Base**: 150kg NPK 15:15:15 per hectare
- **Top dress**: 50kg Urea at tillering and 50kg at panicle initiation

### Tomatoes
- **Base**: 300kg NPK 15:15:15 per hectare
- **Foliar**: Apply micronutrients bi-weekly`,
      author: "Prof. Grace Okonkwo",
      publishDate: "2024-01-20",
      readTime: 8,
      views: 1890,
      rating: 4.6,
      tags: ["soil testing", "fertilizer", "NPK", "pH", "nutrients"],
      downloadable: true
    },
    {
      id: "3",
      title: "Tsarin Shuka Hatsi (Maize Planting System)",
      category: "Crop Management",
      language: "ha",
      content: `Wannan jagora ta kunshi dukkan abubuwan da kuke bukata don samun girma mai kyau na hatsi.

## Shirye-shiryen Gonar
- Noman kasa da kyau
- Kawar da ciyawa
- Gyara yashi idan akwai bukatu

## Zabin Iri
- Yi amfani da iri masu juriya
- Zabin irin da suka dace da yanayin ku
- Tabbatar da iri sababbi ne

## Tsarin Shuki
- Nisan layi: Mita 0.75
- Nisan tsakanin tsire-tsire: Senti 25-30
- Zurfin shuki: Senti 3-5

## Jinya da Namiji
- Yi amfani da NPK 15:15:15
- Shuka 200kg a hektor
- Kara Urea bayan makonni 4-6`,
      author: "Malam Haruna Ibrahim",
      publishDate: "2024-01-10",
      readTime: 6,
      views: 1200,
      rating: 4.9,
      tags: ["hatsi", "shuki", "noma", "jinya"],
      downloadable: true
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "" || article.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "" || article.language === selectedLanguage;
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const popularArticles = articles.sort((a, b) => b.views - a.views).slice(0, 5);
  const recentArticles = articles.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()).slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Agricultural Knowledge Base</h2>
        <p className="text-lg text-gray-600">
          Comprehensive farming resources and best practices in multiple local languages
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Search articles, topics, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Languages</SelectItem>
                    {languages.map((language) => (
                      <SelectItem key={language.code} value={language.code}>
                        <span className="flex items-center space-x-2">
                          <span>{language.flag}</span>
                          <span>{language.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Articles</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="grid gap-6">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{article.category}</Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {languages.find(l => l.code === article.language)?.flag}{" "}
                          {languages.find(l => l.code === article.language)?.name}
                        </Badge>
                        {article.downloadable && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            <Download className="h-3 w-3 mr-1" />
                            PDF
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {article.content.split('\n')[0].substring(0, 150)}...
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>By {article.author}</span>
                        <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{article.rating}</span>
                        </span>
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            Read More
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-xl">{article.title}</DialogTitle>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 pt-2">
                              <span>By {article.author}</span>
                              <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                              <Badge variant="outline">{article.category}</Badge>
                            </div>
                          </DialogHeader>
                          <div className="pt-4">
                            <div className="prose max-w-none">
                              {article.content.split('\n').map((paragraph, index) => {
                                if (paragraph.startsWith('##')) {
                                  return <h2 key={index} className="text-xl font-semibold mt-6 mb-3">{paragraph.replace('##', '').trim()}</h2>;
                                } else if (paragraph.startsWith('###')) {
                                  return <h3 key={index} className="text-lg font-medium mt-4 mb-2">{paragraph.replace('###', '').trim()}</h3>;
                                } else if (paragraph.startsWith('- ')) {
                                  return <li key={index} className="ml-4">{paragraph.replace('- ', '').trim()}</li>;
                                } else if (paragraph.trim()) {
                                  return <p key={index} className="mb-3">{paragraph.trim()}</p>;
                                }
                                return null;
                              })}
                            </div>
                            
                            <div className="mt-6 pt-6 border-t">
                              <div className="flex items-center justify-between">
                                <div className="flex space-x-4">
                                  <Button variant="outline" size="sm">
                                    <Star className="h-4 w-4 mr-1" />
                                    Rate Article
                                  </Button>
                                  {article.downloadable && (
                                    <Button variant="outline" size="sm">
                                      <Download className="h-4 w-4 mr-1" />
                                      Download PDF
                                    </Button>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {article.views} views • {article.readTime} min read
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="grid gap-4">
            {popularArticles.map((article, index) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{article.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <Badge variant="outline">{article.category}</Badge>
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views} views</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{article.rating}</span>
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Read</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid gap-4">
            {recentArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{article.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>By {article.author}</span>
                        <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                        <Badge variant="outline">{article.category}</Badge>
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Read</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Access Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Browse by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                onClick={() => setSelectedCategory(category)}
                className="h-auto p-3 text-left justify-start"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                <span className="text-xs">{category}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};