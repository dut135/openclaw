export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "현재 엔진 상태 보고해.";

    try {
      // @ts-ignore
      const result = await env.AI.run("@cf/meta/llama-3.1-70b-instruct", {
        messages: [
          { role: "system", content: "너는 Tukim의 냉정한 스웩 비서다. 핵심만 찔러라." },
          { role: "user", content: query }
        ],
      });

      return new Response(JSON.stringify({
        status: "70B-ELITE-ACTIVE",
        owner: "Tukim",
        response: result.response
      }), { headers: { "content-type": "application/json;charset=UTF-8" } });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }
};
