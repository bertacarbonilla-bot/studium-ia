
interface Env {
  AI: {
    run: (model: string, input: {
      messages: { role: string; content: string }[];
    }) => Promise<any>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return Response.json(
        { error: "Método no permitido" },
        { status: 405, headers: corsHeaders }
      );
    }

    try {
      const { message } = await request.json() as {
        message?: string;
      };

      if (!message || typeof message !== "string") {
        return Response.json(
          { error: "Mensaje vacío" },
          { status: 400, headers: corsHeaders }
        );
      }

      const result = await env.AI.run(
        "@cf/meta/llama-3.1-8b-instruct",
        {"@cf/zai-org/glm-4.7-flash",
          messages: [
            {
              role: "system",
              content: "Eres el asistente educativo de Studium. Ayudas a estudiantes a aprender, estudiar y organizarse."
            },
            {
              role: "user",
              content: message
            }
          ]
        }
      );

      return Response.json(result, {
        headers: corsHeaders
      });

    } catch (error) {
      return Response.json(
        {
          error: "Error al procesar la solicitud",
          details: error instanceof Error
            ? error.message
            : String(error)
        },
        {
          status: 500,
          headers: corsHeaders
        }
      );
    }
  }
};
