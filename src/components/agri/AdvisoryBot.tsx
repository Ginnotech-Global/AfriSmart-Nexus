import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, User, Globe, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  language: string;
}

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ha", name: "Hausa", flag: "🇳🇬" },
  { code: "yo", name: "Yoruba", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", flag: "🇳🇬" },
  { code: "pcm", name: "Pidgin", flag: "🇳🇬" }
];

const quickQuestions = [
  "What fertilizer should I use for maize?",
  "How do I control pests on my tomatoes?",
  "When is the best time to plant cassava?",
  "What are the signs of plant diseases?",
  "How much water does rice need?",
  "Best practices for organic farming?"
];

export const AdvisoryBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      type: "bot",
      content: getWelcomeMessage(selectedLanguage),
      timestamp: new Date(),
      language: selectedLanguage
    };
    setMessages([welcomeMessage]);
  }, [selectedLanguage]);

  const getWelcomeMessage = (lang: string) => {
    const welcomeMessages = {
      en: "Hello! I'm FarmAI, your agricultural assistant. How can I help you improve your farming today?",
      ha: "Sannu! Ni FarmAI ne, mai taimaka maku a aikin gona. Ta yaya zan iya taimaka maku yau?",
      yo: "Pele! Emi ni FarmAI, oluranlowo re fun ise oko. Bawo ni mo se le ran e lowo loni?",
      ig: "Ndewo! Abu m FarmAI, onye na-enyere gi aka n'ime oru ugbo. Kedu ka m ga-esi nyere gi aka taa?",
      pcm: "How far! I be FarmAI, your farm helper. How I fit help you with your farm work today?"
    };
    return welcomeMessages[lang as keyof typeof welcomeMessages] || welcomeMessages.en;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateBotResponse(inputMessage, selectedLanguage),
        timestamp: new Date(),
        language: selectedLanguage
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateBotResponse = (userInput: string, lang: string) => {
    // Mock AI responses in different languages
    const responses = {
      en: {
        fertilizer: "For maize, I recommend using NPK 15-15-15 fertilizer. Apply 200kg per hectare at planting, then side-dress with urea (46-0-0) at 4-6 weeks. Ensure soil pH is between 6.0-7.0 for optimal nutrient uptake.",
        pest: "For tomato pest control: 1) Use IPM approach 2) Plant marigolds as companion crops 3) Apply neem oil spray weekly 4) Use sticky traps for whiteflies 5) Remove infected plants immediately. Always scout your field regularly.",
        planting: "Best time to plant cassava is at the beginning of the rainy season (April-June in most Nigerian regions). Plant on ridges 1m apart with 1m spacing between plants. Choose disease-resistant varieties like TMS series.",
        default: "I understand your question. For specific agricultural advice, please provide more details about your crop type, location, and current farming challenges. I'm here to help with best practices, pest management, fertilization, and more!"
      },
      ha: {
        fertilizer: "Don hatsi, ina ba da shawarar yin amfani da NPK 15-15-15. Ku yi amfani da kilo 200 a kowane hectare lokacin shuki, sannan ku kara urea a makonni 4-6.",
        pest: "Don yaki da kwari a tumatir: 1) Yi amfani da IPM 2) Shuka marigolds 3) Fesa neem oil 4) Yi amfani da tarki 5) Cire tsire-tsire da cuta.",
        planting: "Lokacin da ya dace don shuka rogo shine farkon damina (Afrilu-Yuni). Shuka akan tudu mita 1 tsakanin layukan.",
        default: "Na fahimci tambayarku. Don samun shawarar noma, ku bayar da cikakkun bayanai game da nau'in amfanin gona, wurin da kuke, da kalubalen da kuke fuskanta."
      },
      yo: {
        fertilizer: "Fun agbado, mo gba niyanju lati lo NPK 15-15-15. Lo 200kg fun hectare kan nigba gbingbin, lehin naa lo urea ni ose 4-6.",
        pest: "Fun idilowo kokoro lori tomati: 1) Lo IPM 2) Gbin marigolds 3) Lo neem oil ni ose kokan 4) Lo trap fun kokoro 5) Yo irugbin ti o ni arun kuro.",
        default: "Mo ye ohun ti o wi. Fun imoran ogbin, je ki o fun mi ni alaye kikun nipa iru irugbin, agbegbe, ati awon wahala ti o wa."
      },
      ig: {
        fertilizer: "Maka oka, ana m akwado iji NPK 15-15-15. Tinye 200kg na hectare n'oge ikuku, wee tinye urea na izu 4-6.",
        pest: "Maka ichikota ahuhia na tomato: 1) Jiri IPM 2) Kuo marigolds 3) Fesa neem oil kwa izu 4) Jiri traps 5) Wepu osisi ndị na-arịa ọrịa.",
        default: "Aghọtara m ajụjụ gị. Maka ndụmọdụ ọrụ ugbo, nye m nkọwa zuru ezu gbasara ụdị ihe ị na-akụ, ebe ị nọ, na nsogbu ị na-enwe."
      },
      pcm: {
        fertilizer: "For corn, use NPK 15-15-15. Put 200kg for one hectare when you dey plant, then add urea for 4-6 weeks time.",
        pest: "For tomato pest wahala: 1) Use IPM method 2) Plant marigold flowers 3) Spray neem oil every week 4) Use trap for insects 5) Remove sick plants quick quick.",
        default: "I understand wetin you talk. For farm advice, tell me more about your crop type, where you dey, and wetin dey worry you for farm."
      }
    };

    const langResponses = responses[lang as keyof typeof responses] || responses.en;
    
    if (userInput.toLowerCase().includes('fertilizer') || userInput.toLowerCase().includes('manure')) {
      return langResponses.fertilizer || langResponses.default;
    } else if (userInput.toLowerCase().includes('pest') || userInput.toLowerCase().includes('insect')) {
      return langResponses.pest || langResponses.default;
    } else if (userInput.toLowerCase().includes('plant') || userInput.toLowerCase().includes('when')) {
      return langResponses.default;
    } else {
      return langResponses.default;
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
    } else {
      // Start listening (mock implementation)
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInputMessage("How do I prevent diseases in my maize crops?");
      }, 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">FarmAI Advisory Bot</h2>
        <p className="text-lg text-gray-600">
          Get 24/7 agricultural advice in your preferred language
        </p>
      </div>

      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-green-600" />
            <span>Choose Your Language</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <span className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Quick Questions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleQuickQuestion(question)}
                className="text-left justify-start h-auto p-3"
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-green-600" />
              <span>Chat with FarmAI</span>
            </span>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              {languages.find(l => l.code === selectedLanguage)?.name}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.type === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                    <span className="text-xs opacity-75">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <span className="text-xs">FarmAI is typing...</span>
                  </div>
                  <div className="flex space-x-1 mt-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask FarmAI anything in ${languages.find(l => l.code === selectedLanguage)?.name}...`}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={toggleVoiceInput}
              variant="outline"
              size="icon"
              className={isListening ? "bg-red-100 text-red-600" : ""}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button onClick={handleSendMessage} size="icon" className="bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Multilingual Support</h3>
              <p className="text-sm text-gray-600">Available in 5 Nigerian languages</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Bot className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">AI-Powered</h3>
              <p className="text-sm text-gray-600">Advanced agricultural knowledge base</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium mb-1">24/7 Available</h3>
              <p className="text-sm text-gray-600">Get help anytime, anywhere</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};