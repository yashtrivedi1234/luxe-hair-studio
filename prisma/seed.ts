import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@12345", 10);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@luxesalon.in" },
    update: { passwordHash },
    create: {
      email: process.env.ADMIN_EMAIL || "admin@luxesalon.in",
      name: "Salon Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  const services = [
    {
      slug: "women-haircut-lucknow",
      name: "Women's Haircut & Style",
      description: "Precision cut and blow-dry tailored to your face shape — popular in Gomti Nagar.",
      category: "Haircuts",
      priceInr: 799,
      durationMin: 60,
      featured: true,
      seoTitle: "Women's Haircut in Lucknow | LuxeSalon Gomti Nagar",
      seoDesc: "Book a women's haircut & styling at LuxeSalon Lucknow. Expert stylists in Gomti Nagar.",
    },
    {
      slug: "mens-haircut-lucknow",
      name: "Men's Haircut & Beard",
      description: "Modern fades, classic cuts, and beard grooming for Lucknow gentlemen.",
      category: "Haircuts",
      priceInr: 449,
      durationMin: 45,
      featured: true,
      seoTitle: "Men's Haircut Lucknow | LuxeSalon",
      seoDesc: "Best men's haircut and beard grooming in Lucknow. Book online at LuxeSalon Gomti Nagar.",
    },
    {
      slug: "balayage-lucknow",
      name: "Balayage / Highlights",
      description: "Soft, sun-kissed balayage and foilyage with premium colour products.",
      category: "Color",
      priceInr: 4999,
      durationMin: 180,
      featured: true,
      seoTitle: "Balayage in Lucknow | Hair Highlights Gomti Nagar",
      seoDesc: "Get balayage and highlights at LuxeSalon Lucknow. Natural, lived-in colour by experts.",
    },
    {
      slug: "global-hair-color",
      name: "Global Hair Colour",
      description: "Full colour application with ammonia-free options available.",
      category: "Color",
      priceInr: 2499,
      durationMin: 120,
      featured: false,
    },
    {
      slug: "keratin-treatment",
      name: "Keratin / Smoothening",
      description: "Frizz control and smooth finish ideal for Lucknow humidity.",
      category: "Treatments",
      priceInr: 5999,
      durationMin: 180,
      featured: true,
    },
    {
      slug: "bridal-hair-makeup-lucknow",
      name: "Bridal Hair & Makeup",
      description: "Complete bridal look trials and wedding-day styling for Lucknow brides.",
      category: "Bridal",
      priceInr: 14999,
      durationMin: 180,
      featured: true,
      seoTitle: "Bridal Makeup Lucknow | Bridal Hair Gomti Nagar",
      seoDesc: "Bridal hair and makeup packages in Lucknow. Trials available at LuxeSalon Gomti Nagar.",
    },
    {
      slug: "party-makeup",
      name: "Party / Occasion Makeup",
      description: "Glam makeup for receptions, parties, and festive events.",
      category: "Bridal",
      priceInr: 2999,
      durationMin: 75,
      featured: false,
    },
    {
      slug: "hair-spa",
      name: "Hair Spa Therapy",
      description: "Deep conditioning spa for damaged or chemically treated hair.",
      category: "Treatments",
      priceInr: 1499,
      durationMin: 60,
      featured: false,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  const stylists = [
    {
      name: "Ananya Sharma",
      title: "Creative Director",
      bio: "12+ years in colour and bridal styling across Lucknow.",
      imageUrl: "/images/founder.jpg",
    },
    {
      name: "Rahul Verma",
      title: "Senior Stylist — Men's",
      bio: "Specialist in fades, texture, and modern Indian men's looks.",
      imageUrl: "/images/gallery-2.jpg",
    },
    {
      name: "Priya Singh",
      title: "Bridal Artist",
      bio: "Known for soft glam bridal makeup for Awadhi weddings.",
      imageUrl: "/images/gallery-3.jpg",
    },
  ];

  await prisma.availability.deleteMany();
  await prisma.stylist.deleteMany();

  for (const st of stylists) {
    const stylist = await prisma.stylist.create({ data: st });
    for (let day = 1; day <= 6; day++) {
      await prisma.availability.create({
        data: {
          stylistId: stylist.id,
          dayOfWeek: day,
          startTime: "10:00",
          endTime: day === 0 ? "18:00" : "20:00",
        },
      });
    }
    // Sunday shorter hours
    await prisma.availability.create({
      data: {
        stylistId: stylist.id,
        dayOfWeek: 0,
        startTime: "11:00",
        endTime: "18:00",
      },
    });
  }

  const offers = [
    {
      slug: "welcome-20",
      title: "New Client Welcome — 20% Off",
      description: "First visit discount on haircuts and blow-dry. Mention code at booking.",
      code: "WELCOME20",
      discountPct: 20,
      active: true,
    },
    {
      slug: "bridal-earlybird",
      title: "Bridal Early Bird Package",
      description: "Book bridal trial 60 days ahead and save on the wedding-day package.",
      code: "BRIDAL60",
      discountPct: 15,
      active: true,
    },
    {
      slug: "festive-glow",
      title: "Festive Glow Combo",
      description: "Hair spa + party makeup combo for Diwali, Eid, and wedding season.",
      code: "FESTIVE",
      discountPct: 10,
      active: true,
    },
  ];

  for (const o of offers) {
    await prisma.offer.upsert({
      where: { slug: o.slug },
      update: o,
      create: o,
    });
  }

  await prisma.galleryItem.deleteMany();
  await prisma.galleryItem.createMany({
    data: [
      { title: "Balayage Transformation", category: "Color", imageUrl: "/images/gallery-1.jpg", sortOrder: 1 },
      { title: "Modern Men's Cut", category: "Men's", imageUrl: "/images/gallery-2.jpg", sortOrder: 2 },
      { title: "Bridal Updo", category: "Bridal", imageUrl: "/images/gallery-3.jpg", sortOrder: 3 },
      { title: "Salon Interior", category: "Salon", imageUrl: "/images/hero-salon.jpg", sortOrder: 4 },
    ],
  });

  await prisma.review.deleteMany();
  await prisma.review.createMany({
    data: [
      {
        name: "Sana Khan",
        rating: 5,
        text: "Best bridal makeup in Gomti Nagar! Ananya understood exactly what I wanted for my nikah.",
        service: "Bridal",
        approved: true,
      },
      {
        name: "Amit Tiwari",
        rating: 5,
        text: "Clean salon, punctual staff, and a perfect haircut. Highly recommend LuxeSalon Lucknow.",
        service: "Men's Haircut",
        approved: true,
      },
      {
        name: "Neha Gupta",
        rating: 5,
        text: "My balayage turned out so natural. Worth every rupee — finally a premium salon in Lucknow.",
        service: "Balayage",
        approved: true,
      },
      {
        name: "Fatima Rizvi",
        rating: 4,
        text: "Hair spa was relaxing. Slight wait on Saturday but results were great.",
        service: "Hair Spa",
        approved: true,
      },
    ],
  });

  const posts = [
    {
      slug: "best-hair-salon-gomti-nagar-lucknow",
      title: "Why Gomti Nagar Is Lucknow's Hub for Premium Hair Salons",
      excerpt: "Looking for a hair salon near Gomti Nagar? Here's what to expect from LuxeSalon Lucknow.",
      content: `LuxeSalon Lucknow sits in the heart of Gomti Nagar — easy to reach from Hazratganj, Indira Nagar, and Aliganj.

Our stylists specialise in women's cuts, men's grooming, balayage, keratin, and bridal hair & makeup designed for Awadhi weddings and festive seasons.

**Book via WhatsApp or our online form** for the same-day or next-day slots when available.`,
      coverUrl: "/images/hero-salon.jpg",
    },
    {
      slug: "bridal-makeup-tips-lucknow-weddings",
      title: "Bridal Makeup Tips for Lucknow Weddings",
      excerpt: "Humidity-proof bridal looks that last through mehendi, baraat, and reception.",
      content: `Lucknow weddings are long and joyful. Choose a trial 4–6 weeks ahead, lock your jewellery and outfit colours, and ask for long-wear products.

LuxeSalon offers bridal trials and wedding-day packages with on-location options for select dates.`,
      coverUrl: "/images/gallery-3.jpg",
    },
  ];

  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  console.log("Seed complete: admin, services, stylists, offers, gallery, reviews, posts");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
