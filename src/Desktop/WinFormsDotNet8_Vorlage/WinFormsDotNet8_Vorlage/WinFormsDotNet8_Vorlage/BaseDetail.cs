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
        protected TModel dataset;
        protected bool isEdit = true;
        private bool _forceClose = false;

        private readonly Dictionary<PropertyInfo, TextBox> _fields 
            = new Dictionary<PropertyInfo, TextBox>();
        private readonly Dictionary<PropertyInfo, ComboBox> _dropdowns
            = new Dictionary<PropertyInfo, ComboBox>();

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
            dataset = data;
            isEdit = edit;
            Controls.Clear();
            _fields.Clear();
            _dropdowns.Clear();
            CreateFields();
        }

        protected virtual Dictionary<int, string> GetDropdownOptionsFor(string propertyName)
        {
            return new Dictionary<int, string>();
        }

        private void CreateFields()
        {
            int top = 20;
            var properties = dataset.GetType().GetProperties();

            foreach (var prop in properties)
            {
                if (prop.Name == "Kundennummer") continue;

                Label lbl = new Label();
                lbl.Text = prop.Name;
                lbl.Left = 20;
                lbl.Top = top + 3;
                lbl.Width = 120;
                Controls.Add(lbl);

                var options = GetDropdownOptionsFor(prop.Name);

                if (options.Count > 0)
                {
                    ComboBox cmb = new ComboBox();
                    cmb.Left = 150;
                    cmb.Top = top;
                    cmb.Width = 200;
                    cmb.DropDownStyle = ComboBoxStyle.DropDownList;
                    cmb.BackColor = Color.FromArgb(60, 60, 65);
                    cmb.ForeColor = Color.White;

                    // empty entry for new records
                    if (!isEdit)
                        cmb.Items.Add(new DropdownItem(0, "— please select —"));

                    foreach (var kv in options)
                        cmb.Items.Add(new DropdownItem(kv.Key, kv.Value));

                    // Vorauswahl beim Bearbeiten
                    var currentValue = prop.GetValue(dataset);
                    int currentId = currentValue != null ? Convert.ToInt32(currentValue) : 0;

                    cmb.SelectedItem = null;
                    foreach (DropdownItem item in cmb.Items)
                    {
                        if (item.Id == currentId)
                        {
                            cmb.SelectedItem = item;
                            break;
                        }
                    }

                    // select empty record for new entries
                    if (!isEdit && cmb.SelectedItem == null && cmb.Items.Count > 0)
                        cmb.SelectedIndex = 0;

                    Controls.Add(cmb);
                    _dropdowns.Add(prop, cmb);
                }
                else
                {
                    // Normal Textbox
                    TextBox textBox = new TextBox();
                    textBox.Left = 150;
                    textBox.Top = top;
                    textBox.Width = 200;
                    var value = prop.GetValue(dataset);
                    textBox.Text = value?.ToString() ?? "";
                    Controls.Add(textBox);
                    _fields.Add(prop, textBox);
                }

                top += 35;
            }

            // Buttons
            Button btnSave = new Button();
            btnSave.Text = "Save";
            btnSave.Left = 20;
            btnSave.Top = top + 10;
            btnSave.Click += BtnSave_Click;
            Controls.Add(btnSave);

            if (isEdit)
            {
                Button btnDelete = new Button();
                btnDelete.Text = "Delete";
                btnDelete.Left = 120;
                btnDelete.Top = top + 10;
                btnDelete.Click += BtnDelete_Click;
                Controls.Add(btnDelete);
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
            foreach (var field in _dropdowns)
            {
                var prop = field.Key;
                var cmb = field.Value;

                if (cmb.SelectedItem == null || ((DropdownItem)cmb.SelectedItem).Id == 0)
                {
                    MessageBox.Show($"Bitte wählen Sie einen Wert für '{prop.Name}' aus.",
                        "Pflichtfeld", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    return;
                }

                prop.SetValue(dataset, ((DropdownItem)cmb.SelectedItem).Id);
            }

            foreach (var field in _fields)
            {
                var prop = field.Key;
                var textBox = field.Value;

                if (string.IsNullOrWhiteSpace(textBox.Text))
                {
                    MessageBox.Show($"Das Feld '{prop.Name}' darf nicht leer sein.",
                        "Pflichtfeld", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    return;
                }

                try
                {
                    var converted = Convert.ChangeType(textBox.Text, prop.PropertyType);
                    prop.SetValue(dataset, converted);
                }
                catch
                {
                    MessageBox.Show($"Ungültiger Wert für {prop.Name}");
                    return;
                }
            }

            SaveToDatabase(dataset, isEdit);
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
                    _forceClose = true;
                    Close();
                }
            }
            else
            {
                _forceClose = true;
                Close();
            }
        }

        private bool gotChanged()
        {
            foreach (var field in _fields)
            {
                var prop = field.Key;
                var textBox = field.Value;
                var originalValue = prop.GetValue(dataset).ToString();
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

        protected override void OnFormClosing(FormClosingEventArgs e)
        {
            if (e.CloseReason == CloseReason.UserClosing && !_forceClose)
            {
                e.Cancel = true;
                this.Hide();
            }
            else
            {
                base.OnFormClosing(e);
            }
        }

        public class DropdownItem
        {
            public int Id { get; }
            public string Label { get; }

            public DropdownItem(int id, string label) { Id = id; Label = label; }

            public override string ToString() => $"{Label} - {Id}";
        }
    }
}
