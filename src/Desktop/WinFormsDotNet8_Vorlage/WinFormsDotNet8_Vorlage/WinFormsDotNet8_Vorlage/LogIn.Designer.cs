namespace WinFormsDotNet8_Vorlage
{
    partial class LogIn
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
            gbLoginBox = new GroupBox();
            tbxPW = new TextBox();
            btnLogin = new Button();
            label1 = new Label();
            label2 = new Label();
            tbxName = new TextBox();
            gbLoginBox.SuspendLayout();
            SuspendLayout();
            // 
            // gbLoginBox
            // 
            gbLoginBox.Controls.Add(tbxPW);
            gbLoginBox.Controls.Add(btnLogin);
            gbLoginBox.Controls.Add(label1);
            gbLoginBox.Controls.Add(label2);
            gbLoginBox.Controls.Add(tbxName);
            gbLoginBox.Dock = DockStyle.Fill;
            gbLoginBox.Location = new Point(0, 0);
            gbLoginBox.Name = "gbLoginBox";
            gbLoginBox.Size = new Size(800, 450);
            gbLoginBox.TabIndex = 0;
            gbLoginBox.TabStop = false;
            // 
            // tbxPW
            // 
            tbxPW.BackColor = Color.FromArgb(63, 63, 70);
            tbxPW.BorderStyle = BorderStyle.None;
            tbxPW.ForeColor = SystemColors.ButtonFace;
            tbxPW.Location = new Point(208, 215);
            tbxPW.Name = "tbxPW";
            tbxPW.PasswordChar = '*';
            tbxPW.PlaceholderText = "Passwort";
            tbxPW.Size = new Size(478, 16);
            tbxPW.TabIndex = 2;
            // 
            // btnLogin
            // 
            btnLogin.Location = new Point(611, 267);
            btnLogin.Name = "btnLogin";
            btnLogin.Size = new Size(75, 23);
            btnLogin.TabIndex = 3;
            btnLogin.Text = "Login";
            btnLogin.UseVisualStyleBackColor = true;
            btnLogin.Click += btnLogin_Click;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.ForeColor = Color.White;
            label1.Location = new Point(111, 161);
            label1.Name = "label1";
            label1.Size = new Size(91, 15);
            label1.TabIndex = 6;
            label1.Text = "Anmeldename: ";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.ForeColor = Color.White;
            label2.Location = new Point(111, 215);
            label2.Name = "label2";
            label2.Size = new Size(60, 15);
            label2.TabIndex = 7;
            label2.Text = "Passwort: ";
            // 
            // tbxName
            // 
            tbxName.BackColor = Color.FromArgb(63, 63, 70);
            tbxName.BorderStyle = BorderStyle.None;
            tbxName.ForeColor = SystemColors.ButtonFace;
            tbxName.Location = new Point(208, 161);
            tbxName.Name = "tbxName";
            tbxName.PlaceholderText = "Anmelde Name";
            tbxName.Size = new Size(478, 16);
            tbxName.TabIndex = 1;
            // 
            // LogIn
            // 
            AllowEndUserDocking = false;
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.FromArgb(45, 45, 48);
            ClientSize = new Size(800, 450);
            Controls.Add(gbLoginBox);
            FormBorderStyle = FormBorderStyle.None;
            Name = "LogIn";
            ShowIcon = false;
            ShowInTaskbar = false;
            Text = "LogIn";
            WindowState = FormWindowState.Maximized;
            gbLoginBox.ResumeLayout(false);
            gbLoginBox.PerformLayout();
            ResumeLayout(false);
        }

        #endregion

        private GroupBox gbLoginBox;
        private Label label1;
        private Label label2;
        private TextBox tbxName;
        private Button btnLogin;
        private TextBox tbxPW;
    }
}