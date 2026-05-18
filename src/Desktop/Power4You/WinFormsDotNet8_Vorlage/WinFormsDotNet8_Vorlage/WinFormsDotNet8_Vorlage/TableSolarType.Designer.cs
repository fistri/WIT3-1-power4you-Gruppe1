namespace WinFormsDotNet8_Vorlage
{
    partial class TableSolarType
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
            btnGetData = new Button();
            dGSolar = new DataGridView();
            ((System.ComponentModel.ISupportInitialize)dGSolar).BeginInit();
            SuspendLayout();
            // 
            // btnGetData
            // 
            btnGetData.Location = new Point(12, 227);
            btnGetData.Name = "btnGetData";
            btnGetData.Size = new Size(129, 23);
            btnGetData.TabIndex = 3;
            btnGetData.Text = "Get Data";
            btnGetData.UseVisualStyleBackColor = true;
            btnGetData.Click += btnGetData_Click;
            // 
            // dGSolar
            // 
            dGSolar.AllowUserToAddRows = false;
            dGSolar.AllowUserToDeleteRows = false;
            dGSolar.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dGSolar.Location = new Point(12, 12);
            dGSolar.Name = "dGSolar";
            dGSolar.ReadOnly = true;
            dGSolar.Size = new Size(548, 195);
            dGSolar.TabIndex = 2;
            // 
            // TableSolarType
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.FromArgb(45, 45, 48);
            ClientSize = new Size(800, 450);
            Controls.Add(btnGetData);
            Controls.Add(dGSolar);
            FormBorderStyle = FormBorderStyle.None;
            Name = "TableSolarType";
            Text = "TableSolar";
            ((System.ComponentModel.ISupportInitialize)dGSolar).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private Button btnGetData;
        private DataGridView dGSolar;
    }
}