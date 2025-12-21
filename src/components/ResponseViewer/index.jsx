import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function tryFormatJSON(text) {
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
}

export function ResponseViewer({ response }) {
  if (!response) return null;

  const isSuccess = response.status >= 200 && response.status < 300;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <span className="font-semibold">Response</span>
        {response.status && (
          <Badge variant={isSuccess ? "success" : "destructive"}>
            {response.status}
          </Badge>
        )}
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="body">
          <TabsList>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
          </TabsList>

          <TabsContent value="body">
            <div className="mt-2 h-[400px] overflow-auto rounded bg-zinc-900 p-4">
              <pre className="m-0 text-sm text-left text-green-400 whitespace-pre-wrap wrap-break-word">
                {response.body ? tryFormatJSON(response.body) : "No body"}
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="headers">
            <div className="mt-2 h-[400px] overflow-auto rounded bg-zinc-900 p-4">
              <pre className="m-0 text-sm text-left text-green-400 whitespace-pre-wrap wrap-break-word">
                {response.headers
                  ? JSON.stringify(response.headers, null, 2)
                  : "No headers"}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
