
export default function handler(req, res) {
  const { tx } = req.query;
  // Тут бы реальный запрос к @send API (если будет доступ)
  if (tx === "demo123") {
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false });
  }
}
