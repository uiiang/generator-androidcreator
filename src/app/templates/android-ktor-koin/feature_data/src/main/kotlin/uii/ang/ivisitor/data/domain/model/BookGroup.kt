// To parse the JSON, install kotlin's serialization plugin and do:
//
// val json      = Json { allowStructuredMapKeys = true }
// val bookGroup = json.parse(BookGroup.serializer(), jsonString)

package <%= basePackageName %>.data.domain.model

import kotlinx.serialization.*
import kotlinx.serialization.json.*
import uii.ang.creator.annotation.Creator
import uii.ang.creator.annotation.Parameter
import uii.ang.creator.annotation.ParseReturn
import uii.ang.creator.annotation.apiTypeKtor
import uii.ang.creator.annotation.requestMethodGet
import uii.ang.creator.annotation.requestParamTypePath
import <%= basePackageName %>.data.data.response.BaseResponseObj

@Creator(
  generateApiType = apiTypeKtor,
  generateApiService = true,
  url = "/api/v3/comic2",
  method = requestMethodGet,
  methodName = "getBookGroupByName",
  parameters = [
    Parameter(
      paramName = "name",
      paramType = "String",
      paramQueryType = requestParamTypePath
    )
  ],
  getCallFailureFuncPath = "getCallFailure",
  checkResponseSuccessFuncPath = "checkResponseSuccess",
  isDynamicBaseUrl = false
)
@Serializable
data class BookGroup(
  @ParseReturn
  @SerialName("results")
  val results: Results? = null
) : BaseResponseObj()

@Serializable
data class Results(
  @SerialName("is_lock")
  val isLock: Boolean? = null,

  @SerialName("is_login")
  val isLogin: Boolean? = null,

  @SerialName("is_mobile_bind")
  val isMobileBind: Boolean? = null,

  @SerialName("is_vip")
  val isVip: Boolean? = null,

  val comic: Comic? = null,
  val popular: Long? = null,
  val groups: Groups? = null
)

@Serializable
data class Comic(
  val uuid: String = "",

  @SerialName("b_404")
  val b404: Boolean = false,

  @SerialName("b_hidden")
  val bHidden: Boolean = false,

  val ban: Long = 0L,
  val name: String = "",
  val alias: String = "",

  @SerialName("path_word")
  val pathWord: String = "",

  @SerialName("close_comment")
  val closeComment: Boolean = false,

  @SerialName("close_roast")
  val closeRoast: Boolean = false,

  @SerialName("free_type")
  val freeType: FreeType? = null,

  val restrict: FreeType? = null,
  val reclass: FreeType? = null,
  val females: JsonArray? = null,
  val males: JsonArray? = null,
  val clubs: JsonArray? = null,

  @SerialName("img_type")
  val imgType: Long = 0L,

  @SerialName("seo_baidu")
  val seoBaidu: String = "",

  val region: FreeType? = null,
  val status: FreeType? = null,
  val author: List<Author>? = null,
  val theme: List<Author>? = null,
  val parodies: JsonArray? = null,
  val brief: String = "",

  @SerialName("datetime_updated")
  val datetimeUpdated: String = "",

  val cover: String = "",

  @SerialName("last_chapter")
  val lastChapter: LastChapter? = null,

  val popular: Long = 0L
)

@Serializable
data class Author(
  val name: String = "",

  @SerialName("path_word")
  val pathWord: String = ""
)

@Serializable
data class FreeType(
  val display: String = "",
  val value: Long = 0L
)

@Serializable
data class LastChapter(
  val uuid: String = "",
  val name: String = ""
)

@Serializable
data class Groups(
  val default: Default? = null,
  val tankobon: Default? = null,

  @SerialName("other_group")
  val otherGroup: Default? = null
)

@Serializable
data class Default(
  @SerialName("path_word")
  val pathWord: String = "",

  val count: Long = 0L,
  val name: String = ""
)
