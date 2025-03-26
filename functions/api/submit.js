// 文件： functions/sendEmail.js （或您的 Pages Function 文件）
import { WorkerMailer } from 'worker-mailer';

export async function onRequest(context) {
  // 从环境变量获取SMTP配置
  const smtpUser = context.env.SMTP_USER;
  const smtpPass = context.env.SMTP_PASS;

  // 1. 连接到 Outlook SMTP 服务器（使用 TLS 加密）
  const mailer = await WorkerMailer.connect({
    host: 'smtp.office365.com',
    port: 587,
    secure: true,                  // 启用 TLS（STARTTLS）
    credentials: {
      username: smtpUser,
      password: smtpPass,
    },
    authType: 'login',             // 使用 LOGIN 方式认证（或 'plain'）
  });

  // 2. 发送邮件
  await mailer.send({
    from: { email: smtpUser },     // 发件人（使用您的 Outlook 邮箱）
    to:   { email: smtpUser },     // 收件人（此处示例发送给自己）
    subject: 'Cloudflare Pages 测试邮件',
    text: '这是一封通过 Cloudflare Pages Functions 发送的测试邮件。',
    // 如果需要，可以增加 html 字段发送富文本内容
  });

  return new Response("邮件发送成功！");
}
