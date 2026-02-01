export default {
  async fetch(request, env) {
    if (request.method === "POST") {
      try {
        const payload = await request.json();
        const chatId = payload.message?.chat?.id;

        if (chatId) {
          // 텔레그램으로 바로 신호 쏴보기
          const tgUrl = `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`;
          await fetch(tgUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              chat_id: chatId, 
              text: "Tukim, 70B 엔진 신호 수신 성공! 이제 진짜 분석 들어간다." 
            })
          });
        }
        return new Response("OK");
      } catch (e) {
        return new Response("Error: " + e.message);
      }
    }
    return new Response("Server is Running");
  }
};
