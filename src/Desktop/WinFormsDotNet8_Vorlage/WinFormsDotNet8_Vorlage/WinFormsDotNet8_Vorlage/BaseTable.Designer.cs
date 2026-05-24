namespace WinFormsDotNet8_Vorlage
{
    partial class BaseTable
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
            dGData = new DataGridView();
            ((System.ComponentModel.ISupportInitialize)dGData).BeginInit();
            SuspendLayout();
            // 
            // btnGetData
            // 
            btnGetData.Location = new Point(12, 227);
            btnGetData.Name = "btnGetData";
            btnGetData.Size = new Size(129, 23);
            btnGetData.TabIndex = 5;
            btnGetData.Text = "Get Data";
            btnGetData.UseVisualStyleBackColor = true;
            btnGetData.Click += btnGetData_Click;
            // 
            // dGData
            // 
            dGData.AllowUserToAddRows = false;
            dGData.AllowUserToDeleteRows = false;
            dGData.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dGData.Location = new Point(12, 12);
            dGData.Name = "dGData";
            dGData.ReadOnly = true;
            dGData.Size = new Size(548, 195);
            dGData.TabIndex = 4;
            dGData.CellMouseDoubleClick += dGData_CellMouseDoubleClick;
            // 
            // BaseTable
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.FromArgb(45, 45, 48);
            ClientSize = new Size(800, 450);
            Controls.Add(btnGetData);
            Controls.Add(dGData);
            FormBorderStyle = FormBorderStyle.None;
            Name = "BaseTable";
            Text = "BaseTable";
            ((System.ComponentModel.ISupportInitialize)dGData).EndInit();
            ResumeLayout(false);
        }

        #endregion

        public Button btnGetData;
        public DataGridView dGData;
    }
}