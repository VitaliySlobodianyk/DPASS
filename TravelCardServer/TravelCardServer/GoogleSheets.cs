using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;



using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Google.Apis.Util.Store;

using TravelCardServer.Models;


namespace TravelCardServer
{
    public class GoogleSheets
    {
        private static string ClientSecret = "client_secret.json";
        private static string[] Scopes = { SheetsService.Scope.Spreadsheets };
        private static readonly string[] ScopesSheets = { SheetsService.Scope.Spreadsheets };
        private static readonly string AppName = "transportcard";
        private static readonly string SpreadsheetId = "19x8ckvrJSbPQJ5dGyj7QIHrlvsaOg-bbbhbC0Yz8tpc";



        private static GoogleCredential GetSheetCredentials()
        {
            GoogleCredential credential;
            using (var stream = new FileStream(ClientSecret, FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream).CreateScoped(Scopes);
            }

            return credential;
        }

        private static SheetsService GetService(GoogleCredential credential)
        {
            return new SheetsService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = AppName
            });
        }

        public static bool IsUnicle(Order order)
        {
            var credential = GetSheetCredentials();
            var service = GetService(credential);
            SpreadsheetsResource.ValuesResource.GetRequest request = service.Spreadsheets.Values.Get(SpreadsheetId, $"{order.date}");


            ValueRange response;

            try
            {
                response = request.Execute();
            }
            catch
            {
                NewList(order.date);
                response = request.Execute();

            }

            foreach (var value in response.Values)
            {
                if(order.id == value[0].ToString())
                {
                    return false;
                }
            }
            return true;
        }

        public static void WriteOrder(Order order)
        {

            var credential = GetSheetCredentials();
            var service = GetService(credential);




            var valueRange = new ValueRange();


            var objectList = new List<object>() { order.id, order.name, order.group, order.phone};

            for(int i = 0; i < 12;i++)
            {
                objectList.Add("");
            }

            foreach (Card card in order.cards)
            {              
               int Position = 4;
                switch (card.type)
                {
                    case "Metro":
                        {
                            Position += 0;
                            break;
                        }
                    case "metroBus":
                        {
                            Position += 3;
                            break;
                        }
                    case "metroTram":
                        {
                            Position += 6;
                            break;
                        }
                    case "metroTroleybus":
                        {
                            Position += 9;
                            break;
                        }

                }

                switch (card.limit)
                {
                    case "46":
                        {
                            Position += 0;
                            break;
                        }
                    case "62":
                        {
                            Position += 1;
                            break;
                        }
                    case "unlim":
                        {
                            Position += 2;
                            break;
                        }

                }

                objectList[Position] = card.quantity;
            }

            objectList.Add("0");//ето че такое??

            


            valueRange.Values = new List<IList<object>> { objectList };

            var appendRequest = service.Spreadsheets.Values.Append(valueRange, SpreadsheetId, $"{order.date}");
            appendRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;


            try
            {
                var appendResponse = appendRequest.Execute();
            }
            catch
            {
                NewList(order.date);
                var appendResponse = appendRequest.Execute();

            }
            


        }

        static void NewList(string name)
        {
            var credential = GetSheetCredentials();
            var service = GetService(credential);

            SpreadsheetsResource.ValuesResource.GetRequest request = service.Spreadsheets.Values.Get(SpreadsheetId, "Лист7");
            ValueRange response = request.Execute();

            var myRequest = new Request
            {
                AddSheet = new AddSheetRequest
                {
                    Properties = new SheetProperties
                    {
                        Title = name,

                        GridProperties = new GridProperties
                        {
                            ColumnCount = 20
                        }

                    }
                }
            };

            List<Request> requests = new List<Request> { myRequest };


            BatchUpdateSpreadsheetRequest batchUpdateSpreadsheet = new BatchUpdateSpreadsheetRequest();
            batchUpdateSpreadsheet.Requests = requests;
            service.Spreadsheets.BatchUpdate(batchUpdateSpreadsheet, SpreadsheetId).Execute();


            var valueRange = new ValueRange();

            valueRange.Values = response.Values;


            var appendRequest = service.Spreadsheets.Values.Append(valueRange, SpreadsheetId, name);
            appendRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;
            var appendResponse = appendRequest.Execute();
        }



        public static void checkOrder(checkedOrder checkedOrder)
        {
            var credential = GetSheetCredentials();
            var service = GetService(credential);

            SpreadsheetsResource.ValuesResource.GetRequest request = service.Spreadsheets.Values.Get(SpreadsheetId, $"{checkedOrder.date}");
              
            try
            {
                ValueRange response = request.Execute();
                checkedOrder.info = response.Values[0][1].ToString();
                foreach (var value in response.Values)
                {
                    if (checkedOrder.id == value[0].ToString())
                    {
                        if (value[16].ToString() == "1")
                        {
                            checkedOrder.approved = true;
                        }
                        else
                        {
                            checkedOrder.approved = false;
                        }
                    }
                }
            }
            catch { }
           
        }

        public static void approveOrder(ApprovedOrder order)
        {
            var credential = GetSheetCredentials();
            var service = GetService(credential);
            SpreadsheetsResource.ValuesResource.GetRequest request = service.Spreadsheets.Values.Get(SpreadsheetId, $"{order.orderDate}");
            ValueRange response = request.Execute();

            var objectList = new List<object>();
            int position = 0;
            for (int i = 0; i< response.Values.Count;i++)
            {
                if (order.id == response.Values[i][0].ToString())
                {
                    objectList.AddRange(response.Values[i]);
                    position = i;
                }
            }



            if(objectList.Count < 19)
            {
                objectList.Add(order.billId);
                objectList.Add(order.payDate);
                objectList.Add(order.sum);
            }
            else
            {
                objectList[17] = order.billId;
                objectList[18] = order.payDate;
                objectList[19] = order.sum;
            }
            
            var valueRange = new ValueRange();

            valueRange.Values = new List<IList<Object>> { objectList };

            var updateRequest = service.Spreadsheets.Values.Update(valueRange, SpreadsheetId, $"{order.orderDate}!A{position + 1}");
            updateRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.UpdateRequest.ValueInputOptionEnum.USERENTERED;
            var updateRespinse = updateRequest.Execute();

        }



    }
}
