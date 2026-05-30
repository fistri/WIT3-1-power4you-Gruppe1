using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics.Eventing.Reader;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using WeifenLuo.WinFormsUI.Docking;

namespace WinFormsDotNet8_Vorlage
{
    public partial class BaseDetail<TModel> : DockContent
    {
        protected TModel Dataset;
        protected bool isEdit = true;
        //TODO primary and secondary keys should not be editable we need to filter those

        private readonly Dictionary<PropertyInfo, TextBox> _fields
    = new Dictionary<PropertyInfo, TextBox>();

        public BaseDetail()
        {
            BackColor = Color.FromArgb(45, 45, 48);
            ForeColor = Color.White;
            ShowIcon = false;
            ShowInTaskbar = false;
           this.ClientSize = new Size(800, 450);
            FormBorderStyle = FormBorderStyle.Sizable;
            ControlBox = false;

        }

        protected void LoadDataset(TModel data, bool edit)
        {
            Dataset = data;
            isEdit = edit;
            Controls.Clear();
            _fields.Clear();

            CreateFields();
        }

        private void CreateFields()
        {
            int top = 20;

            var properties = Dataset.GetType().GetProperties();

            foreach (var prop in properties)
            {
                Label lbl = new Label();
                lbl.Text = prop.Name;
                lbl.Left = 20;
                lbl.Top = top + 3;
                lbl.Width = 120;

                TextBox textBox = new TextBox();
                textBox.Left = 150;
                textBox.Top = top;
                textBox.Width = 200;

                var value = prop.GetValue(Dataset);

                textBox.Text = value?.ToString() ?? "";

                Controls.Add(lbl);
                Controls.Add(textBox);

                _fields.Add(prop, textBox);

                top += 35;
            }
            Button btnSave = new Button();
            btnSave.Text = "Save";
            btnSave.Left = 20;
            btnSave.Top = top + 10;

            btnSave.Click += BtnSave_Click;

            Controls.Add(btnSave);


            if (isEdit)
            {
                Button btnDeletel = new Button();
                btnDeletel.Text = "Delete";
                btnDeletel.Left = 120;
                btnDeletel.Top = top + 10;

                btnDeletel.Click += BtnDelete_Click;

                Controls.Add(btnDeletel);
            }

            Button btnCancel = new Button();
            btnCancel.Text = "Cancel";
            btnCancel.Left = 220;
            btnCancel.Top = top + 10;

            btnCancel.Click += btnCancel_Click;

            Controls.Add(btnCancel);
        }

        private void BtnSave_Click(object sender, EventArgs e)
        {
            SaveToDatabase(Dataset, true);
        }

        private void BtnDelete_Click(object sender, EventArgs e)
        {
            DeleteDataset();
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            if (gotChanged())
            {
                var result = MessageBox.Show(
                 "Are you sure you want to return without saving?",
                 "Please confirm",
                 MessageBoxButtons.YesNo,
                 MessageBoxIcon.Question);

                if (result == DialogResult.Yes)
                {
                    Close();
                }
            }
            else
            {
                Close();
            }
        }

        private bool gotChanged()
        {
            foreach (var field in _fields)
            {
                var prop = field.Key;
                var textBox = field.Value;
                var originalValue = prop.GetValue(Dataset).ToString();
                if (!originalValue.Equals(textBox.Text))
                {
                    return true;
                }
            }
            return false;
        }

        protected virtual void SaveToDatabase(TModel data, bool isEdit)
        {
            // intentionally empty - override in derived form
        }

        protected virtual void DeleteDataset()
        {

        }
    }
}
