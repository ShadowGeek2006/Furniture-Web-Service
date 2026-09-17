import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { RoomCategories } from "@/components/home/RoomCategories";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { CraftsmanshipStory } from "@/components/home/CraftsmanshipStory";
import { CustomFurnitureCTA } from "@/components/home/CustomFurnitureCTA";
import { TrustFeatures } from "@/components/home/TrustFeatures";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <RoomCategories />
      <FeaturedCollection />
      <CraftsmanshipStory />
      <CustomFurnitureCTA />
      <TrustFeatures />
    </div>
  );
}
