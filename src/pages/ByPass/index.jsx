import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResponseViewer } from "@/components/ResponseViewer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ByPass() {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      targetUrl: "",
      method: "GET",
      headers: "{}",
      body: "{}",
    },
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setResponse(null);
    try {
      const headers = data.headers ? JSON.parse(data.headers) : {};
      const fetchOptions = {
        method: data.method,
        headers,
      };
      if (!["GET", "HEAD"].includes(data.method) && data.body) {
        fetchOptions.body = data.body;
      }
      const res = await fetch(
        `http://localhost:3000/bypass-cors?url=${encodeURIComponent(data.targetUrl)}`,
        fetchOptions
      );
      const text = await res.text();
      setResponse({
        status: res.status,
        headers: Object.fromEntries(res.headers.entries()),
        body: text,
      });
    } catch (err) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full p-8 space-y-6 overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle>🚀 Bypass API Tester</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="targetUrl"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="https://api.example.com/endpoint"
                  {...field}
                />
              )}
            />

            <Controller
              name="method"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent>
                    {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {watch("method") !== "GET" && watch("method") !== "HEAD" && (
              <Controller
                name="body"
                control={control}
                render={({ field }) => (
                  <Textarea placeholder='{"title":"hello"}' {...field} />
                )}
              />
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Request"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {response && <ResponseViewer response={response} />}
    </div>
  );
}
