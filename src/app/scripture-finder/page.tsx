"use client"

import * as React from "react"
import { Landmark, Send, Sparkles, RefreshCw, Bookmark, Share2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { aiScriptureFinder, type AiScriptureFinderOutput } from "@/ai/flows/ai-scripture-finder-flow"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export default function FinancialAdvisorPage() {
  const [question, setQuestion] = React.useState("")
  const [result, setResult] = React.useState<AiScriptureFinderOutput | null>(null)
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!question.trim()) return

    setLoading(true)
    setResult(null)
    try {
      const output = await aiScriptureFinder({ question })
      setResult(output)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while generating advice. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleExample = (q: string) => {
    setQuestion(q)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12 fade-in">
        <div className="inline-flex p-4 rounded-full bg-secondary mb-6 shadow-md">
          <TrendingUp className="h-10 w-10 text-secondary-foreground" />
        </div>
        <h1 className="font-headline text-5xl font-bold text-primary mb-4">SACCO AI Advisor</h1>
        <p className="text-muted-foreground text-lg font-body max-w-2xl mx-auto">
          Get expert financial guidance powered by AI. Ask about savings strategies, loan eligibility, or how to grow your wealth.
        </p>
      </div>

      <div className="space-y-8 fade-in">
        <Card className="shadow-2xl border-primary/10 overflow-hidden">
          <CardHeader className="bg-[#003322] text-white pb-8">
            <CardTitle className="font-headline text-2xl flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-[#FFB800]" />
              How can we help your finances today?
            </CardTitle>
            <CardDescription className="text-white/70">
              Type your financial question below for personalized cooperative advice.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="relative">
              <Textarea
                placeholder="Example: How can I save for a house on a small income? or What are the requirements for a business loan?"
                className="min-h-[140px] text-lg resize-none pr-12 pt-4 border-2 focus-visible:ring-primary/20"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <Button
                size="icon"
                className="absolute right-2 bottom-2 bg-[#FFB800] text-[#003322] hover:bg-[#FFB800]/90 h-12 w-12 shadow-md"
                onClick={handleSearch}
                disabled={loading || !question.trim()}
              >
                {loading ? <RefreshCw className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
              </Button>
            </div>

            <div className="mt-8">
              <p className="text-sm font-black text-muted-foreground mb-4 uppercase tracking-widest">
                Common Member Questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "How do I join the SACCO?",
                  "Benefits of agricultural loans",
                  "Saving for retirement strategy",
                  "Understanding dividends",
                  "Emergency fund setup"
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleExample(q)}
                    className="text-xs font-bold py-2 px-4 rounded-full border border-border bg-muted/50 hover:bg-[#FFB800] hover:text-[#003322] hover:border-[#FFB800] transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {loading && (
          <div className="space-y-6 fade-in">
            <Skeleton className="h-[200px] w-full rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-[150px] w-full rounded-xl" />
              <Skeleton className="h-[150px] w-full rounded-xl" />
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-l-8 border-l-[#FFB800] shadow-xl overflow-hidden">
              <CardContent className="p-10">
                <h3 className="font-headline text-3xl font-black text-[#2D2B44] mb-6 uppercase">Expert Guidance</h3>
                <div className="prose prose-blue max-w-none text-[#2D2B44] font-body leading-relaxed text-lg">
                  {result.explanation}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.verses.map((tip, i) => (
                <Card key={i} className="hover:shadow-xl transition-all group border-primary/5">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-headline font-black text-[#003322] bg-[#FFB800]/20 px-4 py-1 rounded-md uppercase text-sm tracking-tighter">
                        Key Strategy
                      </span>
                    </div>
                    <p className="text-[#2D2B44] font-bold text-xl mb-2 font-headline">{tip.reference}</p>
                    <p className="text-muted-foreground font-body leading-relaxed italic">
                      "{tip.text}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pt-8">
              <Button
                variant="outline"
                className="border-[#003322] text-[#003322] hover:bg-[#003322] hover:text-white font-black rounded-full h-14 px-8 uppercase"
                onClick={() => {
                  setResult(null)
                  setQuestion("")
                }}
              >
                New Analysis
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
