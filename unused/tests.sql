

/Users/andrewcaravaggio/Library/Application / Support/AddressBook/Sources/24485206-D95C-4125-A166-735537F69AC7/AddressBook-v22.abcddb


attach "/Users/andrewcaravaggio/Library/Messages/chat.db" as cdb;
attach "/Users/andrewcaravaggio/Library/Application Support/AddressBook/Sources/24485206-D95C-4125-A166-735537F69AC7/AddressBook-v22.abcddb" as adb;




SELECT distinct ZFULLNUMBER || ' ' || ZFIRSTNAME , (ZLASTNAME), chat_message_join.chat_id
from cdb.message
left join cdb.handle
on message.handle_id = handle.ROWID

left join cdb.chat_message_join
on message.ROWID = chat_message_join.message_id

left join adb.ZABCDPHONENUMBER
on handle.id = ZABCDPHONENUMBER.ZFULLNUMBER

left join adb.ZABCDRECORD
on ZABCDPHONENUMBER.ZOWNER = ZABCDRECORD.Z_PK;



from ZABCDPHONENUMBER

join ZABCDRECORD
on ZABCDPHONENUMBER.ZOWNER = ZABCDRECORD.Z_PK;




#Gets list of text messages

select handle.id, ROWID
from message
inner join handle
on message.handle_id = handle.ROWID
inner join cdb
on handle.id = chat.ROWID


Select *
from message
left join handle
on message.handle_id = handle.ROWID
left join chat_message_join
on message.ROWID = chat_message_join.message_id
where chat_id=1
--group by chat_id having count(*) = 1;

--Query that display group chats only
--ROWID is the chat_id that we would pass into the group
select ROWID, substr(guid, -11), display_name from chat where guid not like'%chat%';



select ROWID, guid, display_name 
from chat 
where guid not like'%chat%';



SELECT distinct ZFULLNUMBER || ' ' || ZFIRSTNAME , (ZLASTNAME), temp.ROWID
from  adb.ZABCDPHONENUMBER 
right join (SELECT * from cdb.chat where guid not like'%chat%') as temp
on substr(temp.guid, -12) = ZABCDPHONENUMBER.ZFULLNUMBER
left join adb.ZABCDRECORD
on ZABCDPHONENUMBER.ZOWNER = ZABCDRECORD.Z_PK;