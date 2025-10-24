import { drizzle } from "drizzle-orm/mysql2";
import { portfolioItems, products } from "./drizzle/schema";
import crypto from "crypto";

const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  console.log("🌱 Seeding portfolio items...");

  const portfolioData = [
    {
      id: crypto.randomUUID(),
      title: "Urban Street Art - Hi There",
      description: "Creative street art mural featuring flowing calligraphy and artistic elements. A vibrant piece that brings life to urban spaces.",
      category: "mural",
      imageUrl: "/portfolio-hithere.jpg",
    },
    {
      id: crypto.randomUUID(),
      title: "Character Design - Spray Paint Bottle",
      description: "Original character design featuring a personified spray paint bottle with expressive features. Mixed media artwork combining digital and traditional techniques.",
      category: "3d-model",
      imageUrl: "/portfolio-character.png",
    },
    {
      id: crypto.randomUUID(),
      title: "Abstract Canvas - Neon Energy",
      description: "Vibrant abstract canvas with bold geometric shapes and neon colors. A dynamic piece exploring the intersection of street art and fine art.",
      category: "canvas",
      imageUrl: "/portfolio-canvas.jpg",
    },
    {
      id: crypto.randomUUID(),
      title: "Media Installation - Mountain Design",
      description: "Creative media installation featuring colorful mountain-inspired geometric shapes. Part of a larger installation exploring natural forms through urban art.",
      category: "other",
      imageUrl: "/portfolio-media.jpg",
    },
    {
      id: crypto.randomUUID(),
      title: "Street Art - Pink Graffiti Character",
      description: "Bold street art piece featuring a character design with vibrant pink and blue color schemes. Combines graffiti techniques with character illustration.",
      category: "mural",
      imageUrl: "/portfolio-street-art.jpg",
    },
    {
      id: crypto.randomUUID(),
      title: "Fern Backyard Mural",
      description: "Custom botanical mural featuring vibrant fern designs painted in a residential backyard setting. Demonstrates mastery of natural forms and color harmony.",
      category: "mural",
      imageUrl: "/fern-painting.jpg",
    },
    {
      id: crypto.randomUUID(),
      title: "DMX Airbrush Portrait",
      description: "Professional airbrush portrait of DMX, showcasing detailed technique and color blending. A tribute to hip-hop culture with exceptional realism.",
      category: "portrait",
      imageUrl: "/dmx-portrait.jpg",
    },
    {
      id: crypto.randomUUID(),
      title: "DOA Rapper Portrait",
      description: "Black and white portrait of Australian rapper DOA, demonstrating fine detail work and contrast. A powerful representation of local hip-hop talent.",
      category: "portrait",
      imageUrl: "/doa-portrait.jpg",
    },
  ];

  for (const item of portfolioData) {
    try {
      await db.insert(portfolioItems).values(item);
      console.log(`✓ Added: ${item.title}`);
    } catch (error) {
      console.log(`⚠ Skipped: ${item.title} (already exists)`);
    }
  }

  console.log("🎨 Seeding sample products...");

  const productData = [
    // Workshop Tickets
    {
      id: crypto.randomUUID(),
      name: "Creative Workshop - Single Ticket",
      description: "Join us for a fortnightly creative workshop. Learn new artistic techniques, connect with fellow artists, and explore your creative potential. Each workshop covers different artistic disciplines and is led by experienced instructors.",
      category: "workshop",
      price: "20.00",
      imageUrl: "/portfolio-hithere.jpg",
      isOneOfOne: "false",
      stock: "50",
    },
    {
      id: crypto.randomUUID(),
      name: "Creative Workshop - Pair Tickets",
      description: "Bring a friend! Two tickets for our fortnightly creative workshops. Perfect for friends, couples, or mentors and mentees. Includes all workshop materials and refreshments.",
      category: "workshop",
      price: "30.00",
      imageUrl: "/portfolio-hithere.jpg",
      isOneOfOne: "false",
      stock: "30",
    },

    // 3D Models
    {
      id: crypto.randomUUID(),
      name: "Urban Character Design - 3D Model File",
      description: "High-quality 3D model file of our signature urban character design. Perfect for digital artists, animators, and 3D enthusiasts. Includes multiple formats (OBJ, FBX, BLEND). One-of-one digital asset.",
      category: "3d-model",
      price: "85.00",
      imageUrl: "/portfolio-character.png",
      isOneOfOne: "true",
      stock: "1",
    },
    {
      id: crypto.randomUUID(),
      name: "Spray Paint Bottle Character - 3D Model",
      description: "Detailed 3D model of our personified spray paint bottle character. Ready for animation, rendering, or integration into digital projects. Includes textures and materials.",
      category: "3d-model",
      price: "95.00",
      imageUrl: "/portfolio-character.png",
      isOneOfOne: "true",
      stock: "1",
    },
    {
      id: crypto.randomUUID(),
      name: "Urban Street Scene - 3D Model Pack",
      description: "Complete 3D model pack featuring urban street elements and character designs. Perfect for game developers, animators, and digital artists. Includes 5 unique models.",
      category: "3d-model",
      price: "150.00",
      imageUrl: "/portfolio-character.png",
      isOneOfOne: "false",
      stock: "3",
    },

    // Dioramas
    {
      id: crypto.randomUUID(),
      name: "Urban Street Diorama - Custom Personalization",
      description: "Custom-made urban street diorama featuring detailed street art elements. Each piece is hand-crafted and can be personalized with your own design elements. Perfect for collectors and art enthusiasts.",
      category: "diorama",
      price: "200.00",
      imageUrl: "/portfolio-media.jpg",
      isOneOfOne: "true",
      stock: "1",
    },
    {
      id: crypto.randomUUID(),
      name: "3D Street Art Diorama - Limited Edition",
      description: "Intricately detailed 3D street art diorama showcasing urban culture and artistic expression. Hand-painted and assembled. One-of-a-kind piece with certificate of authenticity.",
      category: "diorama",
      price: "275.00",
      imageUrl: "/portfolio-media.jpg",
      isOneOfOne: "true",
      stock: "1",
    },
    {
      id: crypto.randomUUID(),
      name: "Character Diorama Scene - Customizable",
      description: "Customizable diorama featuring our character designs in an urban setting. Choose your color scheme and design elements. Each piece is hand-crafted to your specifications.",
      category: "diorama",
      price: "225.00",
      imageUrl: "/portfolio-media.jpg",
      isOneOfOne: "true",
      stock: "2",
    },

    // Canvases
    {
      id: crypto.randomUUID(),
      name: "Abstract Neon Canvas - Original",
      description: "Original abstract canvas featuring vibrant neon colors and geometric shapes. Hand-painted acrylic on premium canvas. One-of-a-kind piece with certificate of authenticity.",
      category: "canvas",
      price: "350.00",
      imageUrl: "/portfolio-canvas.jpg",
      isOneOfOne: "true",
      stock: "1",
    },
    {
      id: crypto.randomUUID(),
      name: "Urban Street Art Canvas - Medium",
      description: "Medium-sized canvas featuring bold street art design with vibrant colors. Hand-painted original artwork. Perfect for living spaces and galleries.",
      category: "canvas",
      price: "280.00",
      imageUrl: "/portfolio-canvas.jpg",
      isOneOfOne: "true",
      stock: "1",
    },
    {
      id: crypto.randomUUID(),
      name: "Character Design Canvas - Large Format",
      description: "Large format canvas featuring our signature character designs. Bold, expressive artwork perfect for making a statement. Hand-painted original.",
      category: "canvas",
      price: "420.00",
      imageUrl: "/portfolio-canvas.jpg",
      isOneOfOne: "true",
      stock: "1",
    },
    {
      id: crypto.randomUUID(),
      name: "Mixed Media Canvas - Experimental",
      description: "Experimental mixed media canvas combining traditional painting with digital elements. Unique artistic exploration. One-of-a-kind creation.",
      category: "canvas",
      price: "320.00",
      imageUrl: "/portfolio-canvas.jpg",
      isOneOfOne: "true",
      stock: "1",
    },

    // Other/Reproductions
    {
      id: crypto.randomUUID(),
      name: "Street Art Poster Collection",
      description: "Set of 3 high-quality posters featuring our most popular street art designs. Perfect for decorating your space. Printed on premium paper.",
      category: "other",
      price: "65.00",
      imageUrl: "/portfolio-street-art.jpg",
      isOneOfOne: "false",
      stock: "15",
    },
    {
      id: crypto.randomUUID(),
      name: "Urban Character Design - Limited Edition Print",
      description: "High-quality limited edition print of our signature urban character design. Numbered and signed. Perfect for collectors and art enthusiasts.",
      category: "other",
      price: "45.00",
      imageUrl: "/portfolio-character.png",
      isOneOfOne: "false",
      stock: "10",
    },
  ];

  for (const product of productData) {
    try {
      await db.insert(products).values(product);
      console.log(`✓ Added: ${product.name}`);
    } catch (error) {
      console.log(`⚠ Skipped: ${product.name} (already exists)`);
    }
  }

  console.log("✨ Seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});

