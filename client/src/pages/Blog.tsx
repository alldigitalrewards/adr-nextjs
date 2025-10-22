import { useEffect, useState } from "react"
import { Link } from "wouter"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { client, queries } from "@/lib/sanity"
import { ArrowRight } from "lucide-react"

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  author: string
  publishedAt: string
  excerpt: string
  featuredImage?: any
  categories?: Array<{ title: string; slug: { current: string } }>
}

const navigation = [
  { label: "Platform", url: "/platform", color: "#4CAF50" },
  { label: "Solutions", url: "/solutions", color: "#F44336" },
  { label: "Rewards", url: "/rewards", color: "#9C27B0" },
  { label: "Pricing", url: "/pricing", color: "#FF9800" },
  { label: "Resources", url: "/resources", color: "#2196F3" },
  { label: "About", url: "/about", color: "#00BCD4" },
  { label: "Contact", url: "/contact", color: "#E91E63" },
]

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await client.fetch(queries.allBlogPosts)
        setPosts(data)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header navigation={navigation} />

      <main>
        {/* Hero Section */}
        <section className="bg-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Get Customer and Employee Incentive Ideas, Tips, Tricks, and More
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Loading blog posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-4">No blog posts found.</p>
                <p className="text-gray-500">
                  Run the migration script to import posts from WordPress, or create new posts in Sanity Studio.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Card key={post._id} className="hover:shadow-lg transition-shadow">
                    {post.featuredImage && (
                      <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                        <img
                          src={post.featuredImage.asset?.url || "/placeholder.jpg"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex gap-2 mb-2">
                        {post.categories?.map((category) => (
                          <span
                            key={category.slug.current}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription>
                        {post.author} • {new Date(post.publishedAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                      >
                        Read more <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

