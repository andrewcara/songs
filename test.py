import re

st_str = b'\x04\x0bstreamtyped\x81\xe8\x03\x84\x01@\x84\x84\x84\x19NSMutableAttributedString\x00\x84\x84\x12NSAttributedString\x00\x84\x84\x08NSObject\x00\x85\x92\x84\x84\x84\x0fNSMutableString\x01\x84\x84\x08NSString\x01\x95\x84\x01+Ohttps://open.spotify.com/track/0HRAne096RNKohb88WnT67?si=ExxyI8I6T3-TS3ASwQKwbw\x86\x84\x02iI\x01O\x92\x84\x84\x84\x0cNSDictionary\x00\x95\x84\x01i\x04\x92\x84\x98\x98\x16__kIMLinkAttributeName\x86\x92\x84\x84\x84\x05NSURL\x00\x95\x84\x01c\x00\x92\x84\x98\x98Ohttps://open.spotify.com/track/0HRAne096RNKohb88WnT67?si=ExxyI8I6T3-TS3ASwQKwbw\x86\x86\x92\x84\x98\x98\x1d__kIMMessagePartAttributeName\x86\x92\x84\x84\x84\x08NSNumber\x00\x84\x84\x07NSValue\x00\x95\x84\x01*\x84\x84\x01q\xa1\x00\x86\x92\x84\x98\x98&__kIMBaseWritingDirectionAttributeName\x86\x92\x84\xa1\xa0\xa3\xa1\xff\x86\x92\x84\x98\x98\x1e__kIMDataDetectedAttributeName\x86\x92\x84\x84\x84\x06NSData\x00\x95\x9b\x81s\x02\x84\x06[627c]bplist00\xd4\x01\x02\x03\x04\x05\x06\x07\x0cX$versionY$archiverT$topX$objects\x12\x00\x01\x86\xa0_\x10\x0fNSKeyedArchiver\xd2\x08\t\n\x0bWversionYdd-result\x80\x0b\x80\x01\xac\r\x0e\x1c$%&,-.26:U$null\xd7\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1aRMSV$classRARQTQPRSRRVN\x80\x06\x80\n\x80\x02\x80\x07\x10\x01\x80\x08\xd4\x1d\x1e\x1f\x10 !"#_\x10\x12NS.rangeval.length_\x10\x14NS.rangeval.locationZNS.special\x80\x03\x80\x04\x10\x04\x80\x05\x10O\x10\x00\xd2\'()*Z$classnameX$classesWNSValue\xa2)+XNSObject_\x10Ohttps://open.spotify.com/track/0HRAne096RNKohb88WnT67?si=ExxyI8I6T3-TS3ASwQKwbwWHttpURL\xd2/\x1001ZNS.objects\xa0\x80\t\xd2\'(34^NSMutableArray\xa335+WNSArray\xd2\'(78_\x10\x0fDDScannerResult\xa29+_\x10\x0fDDScannerResult\x10\x01\x00\x08\x00\x11\x00\x1a\x00$\x00)\x002\x007\x00I\x00N\x00V\x00`\x00b\x00d\x00q\x00w\x00\x86\x00\x89\x00\x90\x00\x93\x00\x95\x00\x97\x00\x9a\x00\x9d\x00\x9f\x00\xa1\x00\xa3\x00\xa5\x00\xa7\x00\xa9\x00\xb2\x00\xc7\x00\xde\x00\xe9\x00\xeb\x00\xed\x00\xef\x00\xf1\x00\xf3\x00\xf5\x00\xfa\x01\x05\x01\x0e\x01\x16\x01\x19\x01"\x01t\x01|\x01\x81\x01\x8c\x01\x8d\x01\x8f\x01\x94\x01\xa3\x01\xa7\x01\xaf\x01\xb4\x01\xc6\x01\xc9\x01\xdb\x00\x00\x00\x00\x00\x00\x02\x01\x00\x00\x00\x00\x00\x00\x00;\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\xdd\x86\x86\x86'

st_str = st_str.decode("utf-8", "ignore")

st_str = ''.join(st_str.split())

obj = re.search('https.+?(?=[?])', st_str)

print(obj.group())



# print(encoded)