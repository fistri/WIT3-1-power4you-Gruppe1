using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WinFormsDotNet8_Vorlage
{
    public class FloatTextBox : TextBox
    {
        protected override void OnKeyPress(KeyPressEventArgs e)
        {
            base.OnKeyPress(e);

            char decimalSeparator = System.Globalization.CultureInfo.CurrentCulture
                                          .NumberFormat.NumberDecimalSeparator[0];

            bool isDigit = char.IsDigit(e.KeyChar);
            bool isBackspace = e.KeyChar == (char)Keys.Back;
            bool isSeparator = e.KeyChar == decimalSeparator && !Text.Contains(decimalSeparator);
            bool isMinus = e.KeyChar == '-' && SelectionStart == 0 && !Text.Contains('-');

            if (!isDigit && !isBackspace && !isSeparator && !isMinus)
                e.Handled = true;
        }

        protected override void OnLeave(EventArgs e)
        {
            base.OnLeave(e);

            if (!float.TryParse(Text, out _))
                Text = "0";
        }

        public float FloatValue
        {
            get => float.TryParse(Text, out float v) ? v : 0f;
            set => Text = value.ToString();
        }
    }
}
