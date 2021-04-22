using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using SATSR.Models;

namespace SATSR
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "ISATService" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface ISATService
    {
        [OperationContract]
        USER Login(string userName, string password);

        [OperationContract]
        USER Forgot(string userName);

        [OperationContract]
        bool Register(string name, string lastname, string email, string password);

        [OperationContract]
        bool EmailExists(string email);

        [OperationContract]
        int NewSearch(int iduser, string RFC, int tipoBusqueda, string fecha);

        [OperationContract]
        SearchGenericResult Search69(int idSearch, string RFC, int tipoBusqueda, string fecha);

        [OperationContract]
        SearchGenericResult Search69B(int idSearch, string RFC, int tipoBusqueda, string fecha);

        [OperationContract]
        Detail69Result Detail69(int idSearch);

        [OperationContract]
        Detail69BResult Detail69B(int idSearch);

        [OperationContract]
        ExecResult ChangePassword(int id, string password, string newpassword);

        [OperationContract]
        List<SearchHistoryResult> CurrentSearchs(int idUser);

        [OperationContract]
        List<SearchHistoryResult> History(int idUser);

        [OperationContract]
        List<SearchHistoryResult> ProvHistory(int idUser);

        [OperationContract]
        AccountInfoResult GetAccountInfo(int idUser);

        [OperationContract]
        TypeAccountInfoResult GetTypeAccountInfo(int idUser);

        [OperationContract]
        CurrentPeriodResult CurrentPeriod(int idUser);

        [OperationContract]
        ValidateResult ValidateAccount(int idUser, int toSearch);

        [OperationContract]
        ExecResult ValidateEmail(int idUser);

        [OperationContract]
        AccountPersonalInfoResult GetUserInfo(int idUser);

        [OperationContract]
        List<MessageResult> GetMessages(int idUser);

        [OperationContract]
        bool UpdateMessages(int idMessage, int idUser);

        [OperationContract]
        List<MessageResult> GetAllMessages(int idUser);

        [OperationContract]
        List<SearchHistoryResult> CurrentAutSearchs(int idUser);

        [OperationContract]
        List<Detail69SupuestoResult> ProvHistoryDetail69(int idUser);

        [OperationContract]
        List<Detail69BResult> ProvHistoryDetail69B(int idUser);

        [OperationContract]
        List<SearchHistorySimpleResult> ProvHistorySimple(int idUser);

        [OperationContract]
        bool SendEmailNotification();
    }   
}
