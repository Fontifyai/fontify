"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
  language: z.string({
    required_error: "Please select a language.",
  }),
});

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const Aside = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
  }
  return (
    <div className="my-4 col-span-1 p-4 border rounded-md">
      <h3 className="font-semibold mb-3">Generate Fonts</h3>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what you want to need"
                      className="resize-none min-h-40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboboxDemo />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboboxDemo />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <Button className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Aside;
