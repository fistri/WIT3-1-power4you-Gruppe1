namespace WinFormsDotNet8_Vorlage
{
    partial class SideBar
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
            btnSolarmodultyp = new Button();
            btnCustomer = new Button();
            SuspendLayout();
            // 
            // btnSolarmodultyp
            // 
            btnSolarmodultyp.BackColor = Color.FromArgb(63, 63, 70);
            btnSolarmodultyp.Dock = DockStyle.Top;
            btnSolarmodultyp.FlatAppearance.BorderSize = 0;
            btnSolarmodultyp.FlatStyle = FlatStyle.Flat;
            btnSolarmodultyp.ForeColor = SystemColors.ButtonFace;
            btnSolarmodultyp.Location = new Point(0, 0);
            btnSolarmodultyp.Name = "btnSolarmodultyp";
            btnSolarmodultyp.Size = new Size(250, 23);
            btnSolarmodultyp.TabIndex = 1;
            btnSolarmodultyp.Text = "Solarmodultyp";
            btnSolarmodultyp.UseVisualStyleBackColor = false;
            btnSolarmodultyp.Click += btnSolarmodultyp_Click;
            // 
            // btnCustomer
            // 
            btnCustomer.BackColor = Color.FromArgb(63, 63, 70);
            btnCustomer.Dock = DockStyle.Top;
            btnCustomer.FlatAppearance.BorderSize = 0;
            btnCustomer.FlatStyle = FlatStyle.Flat;
            btnCustomer.ForeColor = SystemColors.ButtonFace;
            btnCustomer.Location = new Point(0, 23);
            btnCustomer.Name = "btnCustomer";
            btnCustomer.Size = new Size(250, 23);
            btnCustomer.TabIndex = 4;
            btnCustomer.Text = "Kunden";
            btnCustomer.UseVisualStyleBackColor = false;
            btnCustomer.Click += btnCustomer_Click;
            // 
            // SideBar
            // 
            AllowEndUserDocking = false;
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.FromArgb(45, 45, 48);
            CausesValidation = false;
            ClientSize = new Size(250, 450);
            CloseButton = false;
            CloseButtonVisible = false;
            Controls.Add(btnCustomer);
            Controls.Add(btnSolarmodultyp);
            FormBorderStyle = FormBorderStyle.None;
            Name = "SideBar";
            Text = "SideBar";
            ResumeLayout(false);
        }

        #endregion
        private Button btnSolarmodultyp;
        private Button btnCustomer;
    }
}