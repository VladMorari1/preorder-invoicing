export const orderEmailTemplate = `
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>{{subject}}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f8fafc;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8fafc;margin:0;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="680" style="width:680px;max-width:680px;background:#fff;border-collapse:collapse;">
        <tr>
          <td style="font-size:0;line-height:0;opacity:0;height:0;overflow:hidden;display:none;">
            Order {{orderNumber}} – {{status}}
          </td>
        </tr>

        <tr>
          <td style="padding:20px 20px 8px 20px;font-family:Arial,Helvetica,sans-serif;">
            <h1 style="margin:0;font-size:20px;line-height:26px;color:#0f172a;font-weight:700;">
              Order {{orderNumber}}
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding:0 20px 12px 20px;font-family:Arial,Helvetica,sans-serif;">
            <div style="font-size:13px;line-height:18px;color:#475569;">
              <div><strong>Status:</strong> {{status}}</div>
              <div><strong>Created at:</strong> {{createdAt}}</div>
              <div><strong>Client:</strong> {{clientName}}</div>
              {{#if organization}}<div><strong>Organization:</strong> {{organization}}</div>{{/if}}
              {{#if phone}}<div><strong>Phone:</strong> {{phone}}</div>{{/if}}
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:0 20px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e5e7eb;">
              <tr><td style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:0 20px;font-family:Arial,Helvetica,sans-serif;color:#334155;font-size:12px;font-weight:700;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr>
                <td width="56" style="padding:0 12px 8px 0;">&nbsp;</td>
                <td align="left" style="padding:0 12px 8px 0;">Product</td>
                <td width="90" align="center" style="padding:0 12px 8px 0;">Type</td>
                <td width="110" align="right" style="padding:0 12px 8px 0;">Price</td>
                <td width="60"  align="center" style="padding:0 12px 8px 0;">Qty.</td>
                <td width="140" align="right" style="padding:0 0 8px 0;">Total (with tax)</td>
              </tr>
            </table>
          </td>
        </tr>

        {{#each items}}
        <tr>
          <td style="padding:12px 20px;font-family:Arial,Helvetica,sans-serif;border-top:1px solid #e5e7eb;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr valign="top">
                <td width="56" style="padding:0 12px 0 0;">
                  {{#if imageUrl}}
                    <img src="{{imageUrl}}" alt="" width="56" height="56"
                      style="display:block;border:0;outline:none;text-decoration:none;border-radius:6px;background:#f1f5f9;">
                  {{/if}}
                </td>

                <td align="left" style="padding:0 12px 0 0;">
                  <div style="font-size:14px;line-height:18px;color:#0f172a;font-weight:600;margin:0 0 4px 0;">
                    {{#if productUrl}}
                      <a href="{{productUrl}}" target="_blank" style="color:#2563eb;text-decoration:none;">{{productName}}</a>
                    {{else}}
                      {{productName}}
                    {{/if}}
                  </div>
                  {{#if ref}}<div style="font-size:12px;line-height:16px;color:#64748b;margin:0;">{{ref}}</div>{{/if}}
                  {{#if warehouse}}<div style="font-size:12px;line-height:16px;color:#64748b;margin:0;">{{warehouse}}</div>{{/if}}
                </td>

                <td width="90" align="center" style="padding:0 12px 0 0;">
                  <span style="display:inline-block;padding:2px 8px;border:1px solid #cbd5e1;border-radius:12px;font-size:12px;color:#0f172a;background:#f8fafc;">
                    {{#if isPreorder}}Pre-order{{else}}Order{{/if}}
                  </span>
                </td>

                <td width="110" align="right" style="padding:0 12px 0 0;white-space:nowrap;font-size:14px;color:#0f172a;">
                  {{price}} {{../currency}}
                </td>

                <td width="60" align="center" style="padding:0 12px 0 0;font-size:14px;color:#0f172a;">
                  {{qty}}
                </td>

                <td width="140" align="right" style="padding:0;white-space:nowrap;">
                  <div style="font-size:14px;color:#0f172a;">{{totalWithTax}} {{../currency}}</div>
                  {{#if preorderCharge}}
                  <div style="font-size:12px;color:#64748b;margin-top:4px;">
                    Charged for pre-order:
                    <strong style="color:#0f172a;">{{preorderCharge}} {{../currency}}</strong>
                  </div>
                  {{/if}}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        {{/each}}

        {{#if totals}}
        <tr>
          <td style="padding:12px 20px 0 20px;font-family:Arial,Helvetica,sans-serif;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e5e7eb;">
              <tr><td style="height:12px;line-height:12px;font-size:0;">&nbsp;</td></tr>
              {{#if totals.subtotal}}
              <tr>
                <td align="right" style="font-size:13px;color:#334155;padding:2px 0;">Subtotal:</td>
                <td align="right" width="160" style="font-size:13px;color:#0f172a;padding:2px 0;white-space:nowrap;">{{totals.subtotal}} {{currency}}</td>
              </tr>{{/if}}
              {{#if totals.tax}}
              <tr>
                <td align="right" style="font-size:13px;color:#334155;padding:2px 0;">Tax:</td>
                <td align="right" width="160" style="font-size:13px;color:#0f172a;padding:2px 0;white-space:nowrap;">{{totals.tax}} {{currency}}</td>
              </tr>{{/if}}
              {{#if totals.shipping}}
              <tr>
                <td align="right" style="font-size:13px;color:#334155;padding:2px 0;">Shipping:</td>
                <td align="right" width="160" style="font-size:13px;color:#0f172a;padding:2px 0;white-space:nowrap;">{{totals.shipping}} {{currency}}</td>
              </tr>{{/if}}
              {{#if totals.grandTotal}}
              <tr>
                <td align="right" style="font-size:13px;color:#0f172a;padding:6px 0;font-weight:700;">Total:</td>
                <td align="right" width="160" style="font-size:13px;color:#0f172a;padding:6px 0;white-space:nowrap;font-weight:700;">{{totals.grandTotal}} {{currency}}</td>
              </tr>{{/if}}
              <tr><td style="height:12px;line-height:12px;font-size:0;">&nbsp;</td><td></td></tr>
            </table>
          </td>
        </tr>
        {{/if}}

        <tr>
          <td style="padding:8px 20px 20px 20px;font-family:Arial,Helvetica,sans-serif;">
            <div style="font-size:12px;color:#64748b;">Thank you for your order.</div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`
