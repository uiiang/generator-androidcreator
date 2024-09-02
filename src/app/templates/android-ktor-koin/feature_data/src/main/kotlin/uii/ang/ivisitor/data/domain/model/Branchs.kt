// To parse the JSON, install kotlin's serialization plugin and do:
//
// val json    = Json { allowStructuredMapKeys = true }
// val branchs = json.parse(Branchs.serializer(), jsonString)

package <%= basePackageName %>.data.domain.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import uii.ang.creator.annotation.Creator
import uii.ang.creator.annotation.Parameter
import uii.ang.creator.annotation.ParseReturn
import uii.ang.creator.annotation.ParseRoot
import uii.ang.creator.annotation.apiTypeKtor
import uii.ang.creator.annotation.requestMethodPost
import uii.ang.creator.annotation.requestParamTypeBody
import <%= basePackageName %>.data.data.response.BaseResponseObj

@Creator(
  generateApiType = apiTypeKtor,
  generateApiService = true,
//    generateApiModel = true,
//    generateResponse = true,
//    generateRetrofitService = true,
  url = "/s_api/GetBranch",
  method = requestMethodPost,
  methodName = "getBranch",
  parameters = [
    Parameter(
      paramName = "msgType",
      paramType = "String",
      paramQueryType = requestParamTypeBody,
      paramDefault = "GetBranch"
    ),
  ],
  getCallFailureFuncPath = "getCallFailure",
  checkResponseSuccessFuncPath = "checkResponseSuccess",
  isDynamicBaseUrl = true,
)
@Serializable
data class Branchs(
  @ParseRoot
  @ParseReturn
  @SerialName("branch")
  val branch: List<Branch>,
) : BaseResponseObj()

//@Creator(
//  generateApiType = apiTypeKtor,
//  generateApiService = false,
//)
@Serializable
data class Branch(
  @SerialName("AdminEmails")
  val adminEmails: String? = null,

  @SerialName("EmailGroupID")
  val emailGroupid: Long? = null,

  @SerialName("EmailInstanceID")
  val emailInstanceid: Long? = null,

  @SerialName("Floors")
  val floors: List<Floor>? = null,

  @SerialName("MailSuffixs")
  val mailSuffixs: List<MailSuffix>? = null,

  @SerialName("PPTypeCode")
  val ppTypeCode: String? = null,

  @SerialName("SMSGroupID")
  val smsGroupid: Long? = null,

  @SerialName("SMSInstanceID")
  val smsInstanceid: Long? = null,

  @SerialName("Status")
  val status: Long? = null,

  @SerialName("Website")
  val website: String? = null,

  @SerialName("addr_cn")
  val addrcn: String? = null,

  @SerialName("addr_en")
  val addrEn: String? = null,

  val cn: String? = null,
  val code: String? = null,
  val en: String? = null,
  val enableEmail: Long? = null,

  @SerialName("enableSMS")
  val enablesms: Long? = null,

  val lat: Double? = null,
  val lng: Double? = null,
  val nation: BranchNation? = null,
  val show: Long? = null,

  @SerialName("TimeZone")
  val timeZone: TimeZone? = null,

  @SerialName("DefaultHost")
  val defaultHost: DefaultHost? = null
)


//@Creator(
//  generateApiType = apiTypeKtor,
//  generateApiService = false,
//)
@Serializable
data class DefaultHost(
  @SerialName("EHID")
  val ehid: Long? = null,

  @SerialName("Eemail")
  val eemail: String? = null,

  @SerialName("Ephone")
  val ephone: String? = null,

  @SerialName("Name")
  val name: String? = null
)


//@Creator(
//  generateApiType = apiTypeKtor,
//  generateApiService = false,
//)
@Serializable
data class Floor(
  @SerialName("BranchCode")
  val branchCode: String? = null,

  @SerialName("CFID")
  val cfid: Long? = null,

  @SerialName("Description")
  val description: String? = null,

  @SerialName("FloorAddUTime")
  val floorAdduTime: String? = null,

  @SerialName("FloorCode")
  val floorCode: String? = null,

  @SerialName("FloorName")
  val floorName: String? = null,

  @SerialName("FloorUnit")
  val floorUnit: String? = null
)


//@Creator(
//  generateApiType = apiTypeKtor,
//  generateApiService = false,
//)
@Serializable
data class MailSuffix(
  @SerialName("AddUTime")
  val adduTime: String? = null,

  @SerialName("BranchCode")
  val branchCode: String? = null,

  @SerialName("Description")
  val description: String? = null,

  @SerialName("MSID")
  val msid: Long? = null,

  @SerialName("MailSuffix")
  val mailSuffix: String? = null,

  @SerialName("Status")
  val status: Long? = null
)


//@Creator(
//  generateApiType = apiTypeKtor,
//  generateApiService = false,
//)
@Serializable
data class BranchNation(
  val cn: String? = null,
  val code: String? = null,
  val code2: String? = null,
  val countrycode: String? = null,
  val en: String? = null,
  val favourite: Long? = null
)


//@Creator(
//  generateApiType = apiTypeKtor,
//  generateApiService = false,
//)
@Serializable
data class TimeZone(
  @SerialName("TimeZoneDes")
  val timeZonedes: String? = null,

  @SerialName("Value")
  val value: Long? = null
)
