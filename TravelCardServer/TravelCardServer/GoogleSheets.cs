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

            SpreadsheetsResource.ValuesResource.GetRequest request = service.Spreadsheets.Values.Get(SpreadsheetId, $"Test");
            ValueRange response = request.Execute();

            foreach(var value in response.Values)
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

            objectList.Add("0");

            


            valueRange.Values = new List<IList<object>> { objectList };

            var appendRequest = service.Spreadsheets.Values.Append(valueRange, SpreadsheetId, $"Test");
            appendRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;
            var appendResponse = appendRequest.Execute();


        }

        public static void checkOrder(checkedOrder checkedOrder)
        {
            var credential = GetSheetCredentials();
            var service = GetService(credential);

            SpreadsheetsResource.ValuesResource.GetRequest request = service.Spreadsheets.Values.Get(SpreadsheetId, $"Test");
            ValueRange response = request.Execute();

            foreach (var value in response.Values)
            {
                if (checkedOrder.id == value[0].ToString())
                {
                    if(value[16].ToString() == "1")
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



    }
}
