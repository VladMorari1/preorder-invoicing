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
        <!-- preheader hidden -->
        <tr>
          <td style="font-size:0;line-height:0;opacity:0;height:0;overflow:hidden;display:none;">
            {{orderNumber}} – {{status}}
          </td>
        </tr>
        <!-- title -->
        <tr>
          <td style="padding:20px 20px 8px 20px;font-family:Arial,Helvetica,sans-serif;">
            <h1 style="margin:0;font-size:20px;line-height:26px;color:#0f172a;font-weight:700;">
              {{orderNumber}}
            </h1>
          </td>
        </tr>

        <!-- meta -->
        <tr>
          <td style="padding:0 20px 12px 20px;font-family:Arial,Helvetica,sans-serif;">
            <div style="font-size:13px;line-height:18px;color:#475569;">
              <div><strong>Status:</strong> {{status}}</div>
              <div><strong>Created at:</strong> {{createdAt}}</div>
              <div><strong>Client:</strong> {{clientName}}</div>
              {{#if organization}}<div><strong>Organization:</strong> {{organization}}</div>{{/if}}
              {{#if phone}}<div><strong>Phone:</strong> {{phone}}</div>{{/if}}
              <div><strong>Whola Pty Ltd:</strong> ABN 75 632 644 565 </div>
            </div>
          </td>
        </tr>

        <!-- spacer line -->
        <tr>
          <td style="padding:0 20px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td style="border-top:1px solid #e5e7eb;height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>

        <!-- unified table: header + items -->
        <tr>
          <td style="padding:0 20px;font-family:Arial,Helvetica,sans-serif;color:#334155;font-size:12px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">

              <!-- header row -->
              <tr>
                <td width="56"  style="padding:0 12px 8px 0;font-weight:700;">&nbsp;</td>
                <td             style="padding:0 12px 8px 0;font-weight:700;" align="left">Product</td>
                <td width="90"  style="padding:0 12px 8px 0;font-weight:700;" align="center">Type</td>
                <td width="110" style="padding:0 12px 8px 0;font-weight:700;" align="right">Price</td>
                <td width="60"  style="padding:0 12px 8px 0;font-weight:700;" align="center">Qty.</td>
                <td width="140" style="padding:0 0 8px 0;font-weight:700;"  align="right">Total (with tax)</td>
              </tr>

              <!-- divider -->
              <tr><td colspan="6" style="border-top:1px solid #e5e7eb;height:0;line-height:0;font-size:0;">&nbsp;</td></tr>

              <!-- items -->
              {{#each items}}
              <tr valign="top">
                <td width="56" style="padding:12px 12px 0 0;border-top:1px solid #e5e7eb;">
                  {{#if imageUrl}}
                    <img src="{{imageUrl}}" alt="" width="56" height="56" style="display:block;border:0;outline:none;text-decoration:none;border-radius:6px;background:#f1f5f9;">
                  {{/if}}
                </td>

                <td style="padding:12px 12px 0 0;border-top:1px solid #e5e7eb;" align="left">
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

                <td width="90" style="padding:12px 12px 0 0;border-top:1px solid #e5e7eb;" align="center">
                  <span style="display:inline-block;padding:2px 8px;border:1px solid #cbd5e1;border-radius:12px;font-size:12px;color:#0f172a;background:#f8fafc;">
                    {{#if isPreorder}}Pre-order{{else}}Order{{/if}}
                  </span>
                </td>

                <td width="110" style="padding:12px 12px 0 0;border-top:1px solid #e5e7eb;white-space:nowrap;font-size:14px;color:#0f172a;" align="right">
                  {{price}} {{../currency}}
                </td>

                <td width="60" style="padding:12px 12px 0 0;border-top:1px solid #e5e7eb;font-size:14px;color:#0f172a;" align="center">
                  {{qty}}
                </td>

                <td width="140" style="padding:12px 0 0 0;border-top:1px solid #e5e7eb;white-space:nowrap;" align="right">
                  <div style="font-size:14px;color:#0f172a;">{{totalWithTax}} {{../currency}}</div>
                  {{#if preorderCharge}}
                  <div style="font-size:12px;color:#64748b;margin-top:4px;">
                    Charged for pre-order:
                    <strong style="color:#0f172a;">{{preorderCharge}} {{../currency}}</strong>
                  </div>
                  {{/if}}
                </td>
              </tr>
              {{/each}}

              <!-- totals (aligned to last column) -->
              {{#if totals}}
              <tr><td colspan="6" style="border-top:1px solid #e5e7eb;height:12px;line-height:12px;font-size:0;">&nbsp;</td></tr>

              {{!-- Items Total: prefer itemsTotal, altfel subtotal --}}
              {{#if totals.itemsTotal}}
              <tr>
                <td colspan="5" style="padding:4px 12px 0 0;font-size:13px;color:#475569;" align="right">Items Total</td>
                <td width="140" style="padding:4px 0 0 0;font-size:13px;color:#0f172a;white-space:nowrap;" align="right">{{totals.itemsTotal}} {{currency}}</td>
              </tr>
              {{/if}}
              {{#unless totals.itemsTotal}}
                {{#if totals.subtotal}}
                <tr>
                  <td colspan="5" style="padding:4px 12px 0 0;font-size:13px;color:#475569;" align="right">Items Total</td>
                  <td width="140" style="padding:4px 0 0 0;font-size:13px;color:#0f172a;white-space:nowrap;" align="right">{{totals.subtotal}} {{currency}}</td>
                </tr>
                {{/if}}
              {{/unless}}

              {{!-- Discounts Total (opțional) --}}
              {{#if totals.discounts}}
              <tr>
                <td colspan="5" style="padding:4px 12px 0 0;font-size:13px;color:#475569;" align="right">Discounts Total</td>
                <td width="140" style="padding:4px 0 0 0;font-size:13px;color:#0f172a;white-space:nowrap;" align="right">{{totals.discounts}} {{currency}}</td>
              </tr>
              {{/if}}

              {{!-- Shipping Total (opțional) --}}
              {{#if totals.shipping}}
              <tr>
                <td colspan="5" style="padding:4px 12px 0 0;font-size:13px;color:#475569;" align="right">Shipping Total</td>
                <td width="140" style="padding:4px 0 0 0;font-size:13px;color:#0f172a;white-space:nowrap;" align="right">{{totals.shipping}} {{currency}}</td>
              </tr>
              {{/if}}

              {{!-- Tax Total (opțional) --}}
              {{#if totals.tax}}
              <tr>
                <td colspan="5" style="padding:4px 12px 0 0;font-size:13px;color:#475569;" align="right">Tax Total</td>
                <td width="140" style="padding:4px 0 0 0;font-size:13px;color:#0f172a;white-space:nowrap;" align="right">{{totals.tax}} {{currency}}</td>
              </tr>
              {{/if}}

              {{!-- Grand total (bold) --}}
              {{#if totals.grandTotal}}
              <tr>
                <td colspan="5" style="padding:8px 12px 0 0;font-size:13px;color:#0f172a;font-weight:700;" align="right">Grand total</td>
                <td width="140" style="padding:8px 0 0 0;font-size:13px;color:#0f172a;white-space:nowrap;font-weight:700;" align="right">{{totals.grandTotal}} {{currency}}</td>
              </tr>
              {{/if}}
              {{/if}}
            </table>
          </td>
        </tr>

        <!-- thanks -->
      <tr>
      <td align="center"
          style="padding:8px 20px 20px 20px;font-family:Arial,Helvetica,sans-serif;text-align:center;">
        <div style="font-size:12px;color:#64748b;">Thank you for your order.</div>
        <div style="font-size:12px;color:#64748b;margin-top:4px;">
          Whola – Shop 2, 46 Hawker St, Brompton SA 5007, Australia.
        </div>
      </td>
    </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`
