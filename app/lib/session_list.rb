class SessionList
    include Singleton

    LIST = Array[]

    def add(token)
        unless LIST.bsearch {|x| x == token }
           LIST.push(token) 
        end 
    end

    def remove(token)        
        LIST.delete(token)         
    end

    def exist(token)
        if LIST.bsearch {|x| x == token }
           true
        else
           false     
        end         
    end
end    