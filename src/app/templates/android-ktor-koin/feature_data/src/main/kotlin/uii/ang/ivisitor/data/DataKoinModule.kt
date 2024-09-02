package <%= basePackageName %>.data

import <%= basePackageName %>.data.data.dataModule
import <%= basePackageName %>.data.data.dataModuleGen
import <%= basePackageName %>.data.data.servicesModule
import <%= basePackageName %>.data.domain.domainModule
import <%= basePackageName %>.data.domain.domainModuleGen
import <%= basePackageName %>.data.service.apiServiceModule

val featureDataModules = listOf(
  apiServiceModule(),
  domainModuleGen(),
  dataModuleGen(),
  servicesModule,
  domainModule,
  dataModule,
//  httpModule,
)
