namespace WinFormsDotNet8_Vorlage
{
    partial class SolarTypeDetailView
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            groupBox1 = new GroupBox();
            tbxImpp = new TextBox();
            label5 = new Label();
            tbxPmpp = new TextBox();
            tbxUmpp = new TextBox();
            tbxBez = new TextBox();
            tbxNummer = new TextBox();
            label4 = new Label();
            label3 = new Label();
            label2 = new Label();
            label1 = new Label();
            groupBox1.SuspendLayout();
            SuspendLayout();
            // 
            // groupBox1
            // 
            groupBox1.Controls.Add(tbxImpp);
            groupBox1.Controls.Add(label5);
            groupBox1.Controls.Add(tbxPmpp);
            groupBox1.Controls.Add(tbxUmpp);
            groupBox1.Controls.Add(tbxBez);
            groupBox1.Controls.Add(tbxNummer);
            groupBox1.Controls.Add(label4);
            groupBox1.Controls.Add(label3);
            groupBox1.Controls.Add(label2);
            groupBox1.Controls.Add(label1);
            groupBox1.Location = new Point(298, 24);
            groupBox1.Name = "groupBox1";
            groupBox1.Size = new Size(442, 383);
            groupBox1.TabIndex = 0;
            groupBox1.TabStop = false;
            groupBox1.Text = "Solarmodultyp Details";
            // 
            // tbxImpp
            // 
            tbxImpp.Location = new Point(180, 243);
            tbxImpp.Name = "tbxImpp";
            tbxImpp.Size = new Size(194, 23);
            tbxImpp.TabIndex = 4;
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Location = new Point(26, 243);
            label5.Name = "label5";
            label5.Size = new Size(35, 15);
            label5.TabIndex = 8;
            label5.Text = "Impp";
            // 
            // tbxPmpp
            // 
            tbxPmpp.Location = new Point(180, 286);
            tbxPmpp.Name = "tbxPmpp";
            tbxPmpp.Size = new Size(194, 23);
            tbxPmpp.TabIndex = 5;
            // 
            // tbxUmpp
            // 
            tbxUmpp.Location = new Point(179, 200);
            tbxUmpp.Name = "tbxUmpp";
            tbxUmpp.Size = new Size(194, 23);
            tbxUmpp.TabIndex = 3;
            // 
            // tbxBez
            // 
            tbxBez.Location = new Point(179, 153);
            tbxBez.Name = "tbxBez";
            tbxBez.Size = new Size(194, 23);
            tbxBez.TabIndex = 2;
            // 
            // tbxNummer
            // 
            tbxNummer.Location = new Point(179, 107);
            tbxNummer.Name = "tbxNummer";
            tbxNummer.Size = new Size(194, 23);
            tbxNummer.TabIndex = 1;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(26, 286);
            label4.Name = "label4";
            label4.Size = new Size(39, 15);
            label4.TabIndex = 3;
            label4.Text = "Pmpp";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(25, 200);
            label3.Name = "label3";
            label3.Size = new Size(40, 15);
            label3.TabIndex = 2;
            label3.Text = "Umpp";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(25, 153);
            label2.Name = "label2";
            label2.Size = new Size(75, 15);
            label2.TabIndex = 1;
            label2.Text = "Bezeichnung";
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(25, 107);
            label1.Name = "label1";
            label1.Size = new Size(131, 15);
            label1.TabIndex = 0;
            label1.Text = "Solarmodultypnummer";
            // 
            // SolarTypeDetailView
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.FromArgb(45, 45, 48);
            ClientSize = new Size(800, 450);
            Controls.Add(groupBox1);
            FormBorderStyle = FormBorderStyle.None;
            Name = "SolarTypeDetailView";
            Text = "SolarDetailView";
            groupBox1.ResumeLayout(false);
            groupBox1.PerformLayout();
            ResumeLayout(false);
        }

        #endregion

        private GroupBox groupBox1;
        private Label label4;
        private Label label3;
        private Label label2;
        private Label label1;
        private TextBox tbxPmpp;
        private TextBox tbxUmpp;
        private TextBox tbxBez;
        private TextBox tbxNummer;
        private TextBox tbxImpp;
        private Label label5;
    }
}