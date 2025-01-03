"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { FontCustomizer } from "./FontCustomizer";

interface FontPreviewProps {
  font: {
    fontFamily: string;
    cssProperties: {
      fontSize: string;
      fontWeight: number;
      letterSpacing: string;
      lineHeight: string;
      fontStyle: string;
      textTransform: string;
    };
  };
  index: number;
}

export function FontPreview({ font: initialFont, index }: FontPreviewProps) {
  const [font, setFont] = useState(initialFont);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [previewText, setPreviewText] = useState(
    "The quick brown fox jumps over the lazy dog"
  );

  const handleCustomization = (newProperties: any) => {
    setFont((prev) => ({
      ...prev,
      cssProperties: {
        ...prev.cssProperties,
        ...newProperties,
      },
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Font Style {index + 1}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCustomizing(!isCustomizing)}
          className="text-xs"
        >
          <Settings2 className="h-4 w-4 mr-2" />
          Customize
        </Button>
      </div>
      <motion.div className="p-4 border rounded-lg" layout>
        <div
          contentEditable
          className="outline-none"
          style={{
            fontFamily: font.fontFamily,
            ...font.cssProperties,
          }}
          onBlur={(e) =>
            setPreviewText(e.currentTarget.textContent || previewText)
          }
          suppressContentEditableWarning
        >
          {previewText}
        </div>
      </motion.div>
      <AnimatePresence>
        {isCustomizing && (
          <FontCustomizer font={font} onUpdate={handleCustomization} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
