using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SATSR.Models
{
    public class MessageResult
    {
        private int _id;
        private DateTime _insertDate;
        private string _title;
        private string _message;
        private string _icon;

        public DateTime InsertDate { get => _insertDate; set => _insertDate = value; }
        public string Title { get => _title; set => _title = value; }
        public string MessageText { get => _message; set => _message = value; }
        public string Icon { get => _icon; set => _icon = value; }
        public int Id { get => _id; set => _id = value; }
    }
}