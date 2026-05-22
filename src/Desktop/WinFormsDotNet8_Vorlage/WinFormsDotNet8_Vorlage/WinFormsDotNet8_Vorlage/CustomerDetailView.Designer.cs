namespace WinFormsDotNet8_Vorlage
{
    partial class CustomerDetailView
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
            dGCustomer = new DataGridView();
            btnGetData = new Button();
            ((System.ComponentModel.ISupportInitialize)dGCustomer).BeginInit();
            SuspendLayout();
            // 
            // dGCustomer
            // 
            dGCustomer.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dGCustomer.Location = new Point(12, 1);
            dGCustomer.Name = "dGCustomer";
            dGCustomer.Size = new Size(776, 231);
            dGCustomer.TabIndex = 0;
            // 
            // btnGetData
            // 
            btnGetData.Location = new Point(12, 260);
            btnGetData.Name = "btnGetData";
            btnGetData.Size = new Size(75, 23);
            btnGetData.TabIndex = 1;
            btnGetData.Text = "Get Data";
            btnGetData.UseVisualStyleBackColor = true;
            btnGetData.Click += btnGetData_Click;
            // 
            // CustomerDetailView
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.FromArgb(45, 45, 48);
            ClientSize = new Size(800, 450);
            Controls.Add(btnGetData);
            Controls.Add(dGCustomer);
            FormBorderStyle = FormBorderStyle.None;
            Name = "CustomerDetailView";
            Text = "CustomerDetailView";
            ((System.ComponentModel.ISupportInitialize)dGCustomer).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private DataGridView dGCustomer;
        private Button btnGetData;
    }
}